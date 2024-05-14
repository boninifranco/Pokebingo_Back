import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';

const baseUrl = 'http://localhost:3030/sala/'

@Injectable()
export class SalaService {
  async create(createSalaDto: CreateSalaDto) {
    return 'This action adds a new sala';
  }

  async findAll(): Promise<Sala[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} sala`;
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return `This action updates a #${id} sala`;
  }

  remove(id: number) {
    return `This action removes a #${id} sala`;
  }
}
