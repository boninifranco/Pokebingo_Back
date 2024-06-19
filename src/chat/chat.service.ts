import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

const baseUrl = 'http://localhost:3030/chat/';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private readonly chatRepository : Repository <Chat>){}
  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try{
      let chat: Chat = await this.chatRepository.save(new Chat(
        createChatDto.mensaje
      ));
      if (chat)
        return chat;
      else
      throw new Error('No se pudo crear el chat');
    } catch (error){
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Error en la creación del chat'+error}, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Chat[]> {
    let chats: Chat[] = await this.chatRepository.find();
    return chats;
  }

  async findOne(id: number): Promise<Chat> {
    let criterio : FindOneOptions = {where: { idChat: id }};
    let chat : Chat = await this.chatRepository.findOne(criterio);
    return chat;
  }
  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    try {
      let criterio : FindOneOptions = {where: {idChat: id}};
      let chat : Chat = await this.chatRepository.findOne(criterio);
      if (!chat)
        throw new Error('No se encuentra el chat');
      else
      chat.setMensaje(updateChatDto.mensaje);     
      chat = await this.chatRepository.save(chat);
      return chat;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:'Error en la actualización del chat' +error},HttpStatus.NOT_FOUND);
    }
  }
  
  async remove(id: number): Promise<boolean> {
    try {
      let criterio : FindOneOptions = {where: {id}};
      let chat : Chat = await this.chatRepository.findOne(criterio);
      if (!chat)
      throw new Error('No se encuentra el chat');
      else
      await this.chatRepository.delete(id);
      return true;
      } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
      error : 'Error en la eliminacion del chat '+error}, HttpStatus.NOT_FOUND);
      }
  }
}
