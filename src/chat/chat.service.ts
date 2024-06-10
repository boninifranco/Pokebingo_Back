import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/chat/';

@Injectable()
export class ChatService {
  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const data = await this.findAll();
    const id = data[0] ? setId(data[data.length - 1].id) : setId(0);
    const newChat = { ...createChatDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newChat),
    });
    const parsed = res.json();
    return parsed;
  }

  async findAll(): Promise<Chat[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Chat> {
    const res = await fetch(`${baseUrl}${id}`);
    if(!res.ok) return;
    const parsed = await res.json();
    return parsed;
  }
  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const isChat = await this.findOne(id);
    if(!isChat) return;
    const update = { ...updateChatDto, id };
    const res = await fetch(baseUrl + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    const parsed = await res.json();
    return parsed;
  }
  
  async remove(id: number): Promise<Chat> {
    const isChat = await this.findOne(id);
    if(!isChat)return;
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = res.json();
    return parsed;
  }
}
