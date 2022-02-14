import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  Res,
  HttpStatus,
  NotFoundException,
  Delete,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthUserDecorator } from 'src/decorators/auth.user.decorator';
import { FptIdAuthGuard } from 'src/guards/auth.guard';
import { UsersService } from '../user/users.service';
import { AuthService } from './auth.service';
import { RefreshAccessTokenDto } from './dto/refresh.access.token.dto';
import { AuthorizationTokenRequest } from './interfaces/authorization.token.request';
import { JwtPayload } from './interfaces/jwt.payload';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('token')
  @UseGuards(FptIdAuthGuard)
  async getAccessToken(@AuthUserDecorator() jwtPayload: JwtPayload) {
    const user = await this.usersService.createOrUpdateUserByEmail(
      jwtPayload.email,
      jwtPayload,
    );
    return {
      accessToken: this.authService.createAccessToken(user),
      refreshToken: await this.authService.createRefreshToken(user),
    };
  }

  /**
   * Xác thực và lấy thông tin user theo requestToken
   * @param requestToken token sau khi FPT.ID xác thực và gửi lại cho FE
   */
  @Post('fpt-id/login')
  async login(@Res() res, @Body() requestToken: AuthorizationTokenRequest) {
    const userInfo = await this.authService.getUserInfoFptId(requestToken);
    if (!userInfo) {
      throw new UnauthorizedException('Request not authenticated');
    }
    const accessToken = this.authService.createAccessToken(userInfo);
    const refreshToken = await this.authService.createRefreshToken(userInfo);
    return res.status(HttpStatus.OK).json({
      accessToken: accessToken,
      token_type: 'bearer',
      refreshToken: refreshToken,
      user: userInfo,
    });
  }

  @Post('refresh-token')
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ) {
    return await this.authService.refreshAccessToken(refreshAccessTokenDto);
  }
}
