import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils.service';
import { RequestTokenDto } from './dto/request.token.dto';
import { User } from '../user/interfaces/user.interface';
import { RefreshToken } from './interfaces/refresh.token';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private jwtService: JwtService,
    // @InjectModel('RefreshToken')
    // private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  /**
   * Lấy thông tin tài khoản user bằng requestToken
   * @param requestToken
   * @returns
   */
  async getUserInfoFptId(requestToken: RequestTokenDto) {
    // return this.httpService
    //   .get(
    //     `${this.configService.get('FPT_ID_ENDPOINT')}/userinfo/?access_token=${
    //       requestToken.accessToken
    //     }`,
    //   )
    //   .pipe(map((response) => response.data));
    return true
  }

  /**
   * Tạo accessToken
   * @param user Thông tin user
   * @returns
   */
  createAccessToken(user: User): string {
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
  async createRefreshToken(userId: string): Promise<string> {
    // const refreshToken = new this.refreshTokenModel({
    //   userId,
    //   refreshToken: UtilsService.generateRandomString(60),
    // });
    // await refreshToken.save();
    // return refreshToken.refreshToken;
    return ''
  }
}