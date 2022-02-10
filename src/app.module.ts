import { BotsModule } from './modules/bot/bots.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BotsModule,
    MongooseModule.forRoot(
      'mongodb://admin:hQGkgHBXj3Agell195H9JxsquUIfPgqh@10.36.6.65:27017/rasa-auth?authSource=admin&readPreference=primary',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
