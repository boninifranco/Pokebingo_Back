import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { setId } from 'src/funciones/funciones';


const baseUrl = 'http://localhost:3030/sala/'

@Injectable()
export class SalaService {
  async create(createSalaDto: CreateSalaDto):Promise<Sala> {
    const data = await this.findAll();
    const id = data[0]?setId(data[data.length-1].id):setId(0);
    const newSala = {...createSalaDto,id};
    const res = await fetch(baseUrl,{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(newSala)
    });
    const parsed = res.json();
    return parsed;
  }

  async findAll(): Promise<Sala[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Sala | null> {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok){
      return null;
    }
    const parsed = await res.json();
    return parsed;
  }
  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<Sala | null> {
    const isSala = await this.findOne(id);
    if(!isSala) return null;
    const update = {...updateSalaDto,id};
    const res = await fetch(`${baseUrl}/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    await res.json();
  }
  async remove(id: number): Promise<any> {
    const isSala = await this.findOne(id);
    if(!isSala)return;
    const res = await fetch(baseUrl + id, {
      method: 'DELETE',
    });
    const parsed = res.json();
    return parsed;
  }
}
