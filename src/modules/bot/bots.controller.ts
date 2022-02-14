import { Controller, Get, Post, Put, Body, Param, Query, Res, HttpStatus, NotFoundException, Delete, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from 'src/guards/auth.guard';
import { BotsService } from './bots.service';
import { CreateBotDTO } from './dto/bots.dto';

@Controller('bots')
export class BotsController {
    constructor(private botsService: BotsService) {}

    /**
     * API create a new bot
     * @param res 
     * @param createBotDTO 
     * @returns 
     */
    @Post()
    @UseGuards(JWTAuthGuard)
    async createBot(@Res() res, @Body() createBotDTO: CreateBotDTO) {
        const newBot = await this.botsService.createBot(createBotDTO);
        return res.status(HttpStatus.CREATED).json({
            message: 'Bot Successfully Created',
            newBot
        })
    }

    /**
     * API get all of bots
     * @param res 
     */
    @Get()
    @UseGuards(JWTAuthGuard)
    async getBots (@Res() res) {
        const products = await this.botsService.getBots();
        res.status(HttpStatus.OK).json(products)
    }

    /**
     * API get detail bot by id
     * @param res 
     * @param botId 
     */
    @Get('/:botId')
    @UseGuards(JWTAuthGuard)
    async getBotById (@Res() res, @Param('botId') botId) {
        const bot = await this.botsService.getBotById(botId);
        if (!bot) throw new NotFoundException("Bot does not exists");
        res.status(HttpStatus.OK).json(bot)
    }

    /**
     * API update bot 
     * @param res 
     * @param createBotDTO 
     * @param botId 
     * @returns 
     */
    @Put()
    @UseGuards(JWTAuthGuard)
    async updateBot(@Res() res, @Body() createBotDTO: CreateBotDTO, @Query('botId') botId) {
        const updatedBot = await this.botsService.updateBot(botId, createBotDTO);
        if (!updatedBot) throw new NotFoundException("Bot does not exists");
        return res.status(HttpStatus.OK).json({
            message: 'Bot Updated Successfully',
            updatedBot
        })
    }

    /**
     * API delete bot by id
     * @param res 
     * @param botId 
     */
    @Delete('/:botId')
    @UseGuards(JWTAuthGuard)
    async deleteBot (@Res() res, @Param('botId') botId) {
        const deleteBot = await this.botsService.deleteBot(botId);
        if (!deleteBot) throw new NotFoundException("Bot does not exists");
        res.status(HttpStatus.OK).json({
            message: 'Bot Deleted Successfully',
            deleteBot
        })
    }
}
