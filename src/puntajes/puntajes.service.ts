import { Injectable } from '@nestjs/common';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';
import { Puntajes } from './entities/puntajes.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/puntajes'

@Injectable()
export class PuntajesService {
  async create(createPuntajesDto: CreatePuntajesDto): Promise<Puntajes> {
    const datos = await this.findAll();
    const id = datos.length ? setId(datos[datos.length - 1].id).toString() : setId(0);
    const newPuntaje = { ...createPuntajesDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPuntaje),
    });
    const parsed = await res.json();
    return parsed;
  }

  async findAll(): Promise<Puntajes[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Puntajes> {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok)return;
    const parsed = await res.json();
    return parsed;
  }

  async update(id: number, updatePuntajesDto: UpdatePuntajesDto): Promise<Puntajes> {
    const isPuntaje = await this.findOne(id);
    if(!isPuntaje)return;
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePuntajesDto),
    });    
    const parsed = await res.json();
    return parsed;
  }

  async remove(id: number){
    const isPuntaje = await this.findOne(id);
    if(!isPuntaje)return;
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const parsed = res.json();
    return parsed;    
  }
}
