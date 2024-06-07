import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';
import { Logueo } from './entities/logueo.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/logueo'

@Injectable()
export class LogueoService {
  async create(createLogueoDto: CreateLogueoDto):Promise<Logueo> {
    const datos = await this.findAll();
    const id = datos[0]?setId(datos[datos.length-1].id).toString() : setId(0);
    const newLogueo = {...createLogueoDto,id}
    const res = await fetch(baseUrl,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(newLogueo)
    });
    const parsed = res.json()    
    return parsed ;
  }

  async findAll():Promise<Logueo[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number):Promise<Logueo> {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok)return;    
      const parsed = res.json();
      return parsed;
    
       
    
  }

  async update(id: number, updateLogueoDto: UpdateLogueoDto):Promise<Logueo> {
    const isLogueo = await this.findOne(id);
    if(!isLogueo)return;
    const newLogueo = {...updateLogueoDto,id};
    const res = await fetch(`${baseUrl}/${id}`,{
      method:"PATCH",
      headers:{
        'Content-type':'Application-json'
      },
      body: JSON.stringify(newLogueo)
    });
    const parsed = res.json()
    return parsed;
  }

  async remove(id: number):Promise<Logueo> {
    const isLogueo = await this.findOne(id);
    if(!isLogueo)return;
    const res = await fetch(`${baseUrl}/${id}`,{
      method:"DELETE"
    });
    const parsed = res.json();
    return parsed;
  }
}
