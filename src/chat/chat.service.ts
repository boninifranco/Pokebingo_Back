import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from 'src/sala/entities/sala.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Sala) private readonly salaRepository: Repository<Sala>
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try{
    const sala = await this.salaRepository.findOne({ where: { salaId: createChatDto.salaId } });
    if (!sala) {
      throw new HttpException('Sala no encontrada', HttpStatus.NOT_FOUND);
    }

    const chat = new Chat(createChatDto.mensaje, sala);
    return await this.chatRepository.save(chat);
  } catch (error){
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error: ' + error,
      },
      HttpStatus.NOT_FOUND,
    )}
  }

  async findAll(): Promise<Chat[]> {
    try {
      const chats: Chat[] = await this.chatRepository.find();
      if (chats.length != 0) return chats;
      else throw new Error('No se encontraron chats');
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: ' + error}, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<Chat> {
    try {
      const criterio = { where: { chatId: id } };
      const chat: Chat = await this.chatRepository.findOne(criterio);
      if (chat) return chat;
      else throw new Error(`No se encontró el chat: ${id}`);
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: ' + error}, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    try {
      const criterio = { where: { chatId: id } };
      let chat: Chat = await this.chatRepository.findOne(criterio);
      if (!chat) throw new Error(`No se encuentra el chat: ${id}`);
      else {
        chat.setMensaje(updateChatDto.mensaje);
        chat = await this.chatRepository.save(chat);
        return chat;
      }
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: ' + error}, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const criterio = { where: { chatId: id } };
      const chat: Chat = await this.chatRepository.findOne(criterio);
      if (!chat) throw new Error(`No se encuentra el chat: ${id}`);
      else {
        await this.chatRepository.delete(id);
        return true;
      }
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: ' + error}, HttpStatus.NOT_FOUND);
    }
  }
}
