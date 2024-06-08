import { Injectable } from '@nestjs/common';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/torneos/';

@Injectable()
export class TorneosService {
  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    const data = await this.findAll();
    const id = data[0] ? setId(data[data.length - 1].id) : setId(0);
    const newTorneo = { ...createTorneoDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTorneo),
    });
    const parsed = res.json();
    return parsed;
  }

  async findAll(): Promise<Torneo[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }
  async findOne(id: number): Promise<Torneo> {
    const res = await fetch(baseUrl + id);
    if(!res.ok){
      return;
    }
    const parsed = await res.json();
    return parsed;
  }
  async update(id: number, UpdateTorneoDto: UpdateTorneoDto): Promise<Torneo> {
    const update = { ...UpdateTorneoDto, id };
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    const parsed = await res.json();
    return parsed;
  }
  async remove(id: number): Promise<Torneo> {
    const isTorneo = await this.findOne(id);
    if(!isTorneo)return;
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = res.json();
    return parsed;
  }
}
