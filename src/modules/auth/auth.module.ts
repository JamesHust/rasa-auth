import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './schemas/refresh.token.schema';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    MongooseModule.forFeature([
      { name: 'refresh-token', schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
