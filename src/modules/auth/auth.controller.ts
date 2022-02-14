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
import { FptIdAuthGuard } from 'src/guards/auth.guard';
// import { UsersService } from '../user/users.service';
import { AuthService } from './auth.service';
import { RequestTokenDto } from './dto/request.token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    // private userService: UsersService,
  ) {}

  /**
   * Xác thực và lấy thông tin user theo requestToken
   * @param requestToken token sau khi FPT.ID xác thực và gửi lại cho FE
   */
  @Post('login')
  @UseGuards(FptIdAuthGuard)
  async login(@Res() res, @Body() requestToken: RequestTokenDto) {
    const userInfo = await this.authService.getUserInfoFptId(requestToken);
    if (!userInfo) {
      throw new UnauthorizedException('Request not authenticated');
    }
    // const accessToken = await this.authService.createAccessToken(userInfo);
    // const refreshToken = await this.authService.createRefreshToken(userInfo._id);
    return res.status(HttpStatus.OK).json({
    //   accessToken: accessToken,
      token_type: 'bearer',
    //   refreshToken: refreshToken,
      user: userInfo,
    });
  }
}
