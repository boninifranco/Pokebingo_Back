import { Injectable } from '@nestjs/common';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';
import { Puntajes } from './entities/puntajes.entity';

const baseUrl = 'http://localhost:3030/Puntajes/'

@Injectable()
export class PuntajesService {
  create(createPuntajesDto: CreatePuntajesDto) {
    return 'This action adds a new Puntajes';
  }

  async findAll():Promise<Puntajes> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} Puntajes`;
  }

  update(id: number, updatePuntajesDto: UpdatePuntajesDto) {
    return `This action updates a #${id} Puntajes`;
  }

  remove(id: number) {
    return `This action removes a #${id} Puntajes`;
  }
}
