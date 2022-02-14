import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import { UtilsService } from 'src/utils/utils.service';
import { RequestTokenDto } from './dto/request.token.dto';
import { User } from '../user/interfaces/user.interface';
import { RefreshToken } from './interfaces/refresh.token';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { JwtPayload } from './interfaces/jwt.payload';
import { AuthorizationTokenRequest } from './interfaces/authorization.token.request';
import { RefreshAccessTokenDto } from './dto/refresh.access.token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private jwtService: JwtService,
    private usersService: UsersService, 
    @InjectModel('refresh-token')
    private refreshTokenModel: Model<RefreshToken>
  ) 
  {}

  /**
   * Lấy accessToken từ FPT.ID
   * @param requestToken
   */
  async getAccessTokenFromFptId(requestToken: AuthorizationTokenRequest) {
    const body = Object.keys(requestToken)
      .map(function (k) {
        return (
          encodeURIComponent(k) + '=' + encodeURIComponent(requestToken[k])
        );
      })
      .join('&');
    return this.httpService
      .post(`${this.configService.get('FPT_ID_ENDPOINT')}/token`, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(map((response) => response.data));
  }

  /**
   * Lấy thông tin tài khoản user bằng requestToken
   * @param requestToken
   * @returns
   */
  async getUserInfoFptId(requestToken: AuthorizationTokenRequest) {
    const accessToken = await this.getAccessTokenFromFptId(requestToken);

    return this.httpService
      .get(`${this.configService.get('FPT_ID_ENDPOINT')}/userinfo`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      .pipe(map((response) => response.data));
  }

  /**
   * Tạo accessToken
   * @param user Thông tin user
   * @returns
   */
  createAccessToken(user): string {
    return this.jwtService.sign({
      sub: user._id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
    });
  }

  /**
   * Tạo refreshToken
   * @param userId
   * @returns
   */
  async createRefreshToken(user): Promise<string> {
    const userId = user._id
    if (userId) {
      const refreshToken = new this.refreshTokenModel({
        userId,
        refreshToken: UtilsService.generateRandomString(60),
      });
      await refreshToken.save();
      return refreshToken.refreshToken;
    }
  }

  /**
   * Validate JWT mỗi lần bên client gửi request lên BE
   * @param jwtPayload
   * @returns
   */
  async validateJwtUser(jwtPayload: JwtPayload): Promise<User> {
    try {
      return await this.usersService.findUserById(jwtPayload.sub);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  /**
   * Tạo accessToken mới từ refreshToken
   * @param refreshAccessTokenDto 
   * @returns 
   */
  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {

    const userExist = await this.refreshTokenModel.findOne({
      refreshToken: refreshAccessTokenDto.refreshToken,
    });
    if (!userExist) {
      throw new UnauthorizedException('User has been logged out.');
    }
    const user = await this.usersService.findUserById(userExist.id);
    if (!user) {
      throw new BadRequestException('Bad request');
    }
    return {
      accessToken: this.createAccessToken(user),
    };
  }
}
