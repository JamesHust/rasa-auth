import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBotDTO } from './dto/bots.dto';
import { Bot } from './interfaces/bots.interface';

@Injectable()
export class BotsService {
  constructor(@InjectModel('Bot') private readonly botModel: Model<Bot>) {}

  /**
   * create a new bot
   * @param createBotDTO request
   * @returns new bot
   */
  async createBot(createBotDTO: CreateBotDTO): Promise<Bot> {
    const bot = new this.botModel(createBotDTO);
    await bot.save()
    return bot;
  }

  /**
   * get all of bots
   * @returns list bot
   */
  async getBots(): Promise<Bot[]> {
    const bots = await this.botModel.find();
    return bots;
  }

  /**
   * get detail bot by id
   * @param botId
   * @returns bot
   */
  async getBotById(botId: string): Promise<Bot> {
    const bot = await this.botModel.findById(botId);
    return bot;
  }

  /**
   * update bot by id
   * @param botId 
   * @param createBotDTO 
   */
  async updateBot(botId: string, createBotDTO: CreateBotDTO): Promise<Bot> {
    const updateBot = await this.botModel.findByIdAndUpdate(botId, createBotDTO);
    return updateBot
  }

  /**
   * delete bot by id
   * @param botId 
   * @returns 
   */
  async deleteBot(botId: string): Promise<Bot> {
      const deleteBot = await this.botModel.findByIdAndDelete(botId);
      return deleteBot;
  }
}
