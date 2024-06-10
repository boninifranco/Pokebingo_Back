import { Injectable } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/partidas/'

@Injectable()
export class PartidasService {
  async create(createPartidaDto: CreatePartidaDto): Promise<Partida> {
    const data = await this.findAll();
    const id = data[0] ? setId(data[data.length - 1].id):setId(0);
    const newPartida = {...createPartidaDto,id};
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newPartida),
    })
    const parsed = res.json();
    return parsed;
  }

  async findAll(): Promise<Partida[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Partida> {
    const res = await fetch(baseUrl + id);
    if(!res.ok) return;
    const parsed = await res.json();
    return parsed;
  }
  async update(id: number, UpdatePartidaDto: UpdatePartidaDto): Promise<Partida> {
    const update = { ...UpdatePartidaDto, id };
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
  async remove(id: number): Promise<Partida> {
    const isPartida = await this.findOne(id);
    if(!isPartida)return;
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = res.json();
    return parsed;
  }
}
