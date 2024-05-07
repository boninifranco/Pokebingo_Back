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

  async findOne(id: number): Promise<Sala> {
    const res = await fetch(baseUrl + id);
    const parsed = await res.json();
    return parsed;
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return `This action updates a #${id} sala`;
  }

  remove(id: number) {
    return `This action removes a #${id} sala`;
  }
}
