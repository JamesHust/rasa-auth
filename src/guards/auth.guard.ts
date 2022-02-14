import { AuthGuard } from '@nestjs/passport';

//Sử dụng cho luồng login bằng FPT.ID
export const FptIdAuthGuard = AuthGuard('fpt-id');

export const JWTAuthGuard = AuthGuard('jwt');
