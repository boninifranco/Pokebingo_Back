import { Injectable } from '@nestjs/common';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';

const baseUrl = 'http://localhost:3030/torneos/'

@Injectable()
export class TorneosService {
  create(createTorneoDto: CreateTorneoDto) {
    return 'This action adds a new torneo';
  }

  async findAll(): Promise<Torneo[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} torneo`;
  }

  update(id: number, updateTorneoDto: UpdateTorneoDto) {
    return `This action updates a #${id} torneo`;
  }

  remove(id: number) {
    return `This action removes a #${id} torneo`;
  }
}
