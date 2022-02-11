import { BotsModule } from './modules/bot/bots.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BotsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_RASA_USER}:${process.env.MONGO_RASA_PASSWORD}@${process.env.MONGO_RASA_HOST}:${process.env.MONGO_RASA_POST}/${process.env.MONGO_RASA_DB}?authSource=admin&readPreference=primary`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
