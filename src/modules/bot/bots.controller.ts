import { Controller, Get, Post, Put, Body, Param, Query, Res, HttpStatus, NotFoundException, Delete } from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDTO } from './dto/bots.dto';

@Controller('bots')
export class BotsController {
    constructor(private botsService: BotsService) {}

    @Post()
    async createBot(@Res() res, @Body() createBotDTO: CreateBotDTO) {
        const newBot = await this.botsService.createBot(createBotDTO);
        return res.status(HttpStatus.CREATED).json({
            message: 'Bot Successfully Created',
            newBot
        })
    }

    @Get()
    async getBots (@Res() res) {
        const products = await this.botsService.getBots();
        res.status(HttpStatus.OK).json(products)
    }

    @Get('/:botId')
    async getBotById (@Res() res, @Param('botId') botId) {
        const bot = await this.botsService.getBotById(botId);
        if (!bot) throw new NotFoundException("Bot does not exists");
        res.status(HttpStatus.OK).json(bot)
    }

    @Put()
    async updateBot(@Res() res, @Body() createBotDTO: CreateBotDTO, @Query('botId') botId) {
        const updatedBot = await this.botsService.updateBot(botId, createBotDTO);
        if (!updatedBot) throw new NotFoundException("Bot does not exists");
        return res.status(HttpStatus.OK).json({
            message: 'Bot Updated Successfully',
            updatedBot
        })
    }

    @Delete('/:botId')
    async deleteBot (@Res() res, @Param('botId') botId) {
        const deleteBot = await this.botsService.deleteBot(botId);
        if (!deleteBot) throw new NotFoundException("Bot does not exists");
        res.status(HttpStatus.OK).json({
            message: 'Bot Deleted Successfully',
            deleteBot
        })
    }
}
