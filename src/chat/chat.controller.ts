import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.create(createChatDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: number): Promise<Chat> {
    const chat = await this.chatService.findOne(id)
    if (chat) {
      res.status(HttpStatus.FOUND).json(chat);
      return chat;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'chat no existe' });
  }

  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: number, @Body() updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.chatService.update(id, updateChatDto);
    if (chat) {
      res.status(HttpStatus.FOUND).json(chat);
      return chat;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'chat no existe' });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number){
    const chat = await this.chatService.remove(id);
    if(chat){
      res.status(HttpStatus.FOUND).json(chat);      
    }
    res.status(HttpStatus.NOT_FOUND).json({error:`chat no existe`})
  }
}
