import { Injectable } from '@nestjs/common';
import { CreatePremiosDto } from './dto/create-premios.dto';
import { UpdatePremiosDto } from './dto/update-premios.dto';
import { Premios } from './entities/premios.entity';
import { setId } from 'src/funciones/funciones';


const baseUrl = 'http://localhost:3030/premios'

@Injectable()
export class PremiosService {
  async create(createPremiosDto: CreatePremiosDto): Promise<Premios> {
    const datos = await this.findAll();
    const id = datos.length ? setId(datos[datos.length - 1].id).toString() : setId(0);
    const newPremio = { ...createPremiosDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPremio),
    });
    const parsed = await res.json();
    return parsed;
  }

  async findAll(): Promise<Premios[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Premios> {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok)return;
    const parsed = await res.json();
    return parsed;
  }

  async update(id: number, updatePremiosDto: UpdatePremiosDto): Promise<Premios> {
    const isPremio = await this.findOne(id);
    if(!isPremio)return;
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePremiosDto),
    });
    const parsed = await res.json();
    return parsed;
  }

  async remove(id: number){
    const isPremio = await this.findOne(id);
    if(!isPremio)return;
    const res = await fetch(`${baseUrl}/${id}`,{
      method: "DELETE",      
    });
    const parsed = res.json();
    return parsed;        
  };
}
