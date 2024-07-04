import {Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, HttpCode, ParseIntPipe} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.create(createChatDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Chat> {
    const chat = await this.chatService.findOne(id);
    return chat;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChatDto: UpdateChatDto,
  ): Promise<Chat> {
    const chat = await this.chatService.update(id, updateChatDto);
    return chat;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const chat = await this.chatService.remove(id);
    return chat;
  }
}
