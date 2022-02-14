import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class FptIdStrategy extends PassportStrategy(Strategy, 'fpt-id') {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super({
      authorizationURL: `${configService.get('FPT_ID_URL')}/authorize`,
      tokenURL: `${configService.get('FPT_ID_URL')}/token/`,
      scope: 'Openid profile',
      clientID: configService.get('FPT_ID_CLIENT_ID'),
      clientSecret: configService.get('FPT_ID_CLIENT_SECRET'),
    });
  }
  async validate(accessToken: string): Promise<any> {
    return this.httpService
      .get(
        `${this.configService.get(
          'FPT_ID_URL',
        )}/userinfo/?access_token=${accessToken}`,
      )
      .pipe(map((response) => response.data));
  }
}
