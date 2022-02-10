import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';
import { BotSchema } from './schemas/bots.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Bot',
        schema: BotSchema
    }])],
    controllers: [BotsController],
    providers: [BotsService],
})
export class BotsModule {}
