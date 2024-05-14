import { Injectable } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';

const baseUrl = 'http://localhost:3030/partidas/'

@Injectable()
export class PartidasService {
  create(createPartidaDto: CreatePartidaDto) {
    return 'This action adds a new partida';
  }

  async findAll(): Promise<Partida[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} partida`;
  }

  update(id: number, updatePartidaDto: UpdatePartidaDto) {
    return `This action updates a #${id} partida`;
  }

  remove(id: number) {
    return `This action removes a #${id} partida`;
  }
}
