import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/registro';

@Injectable()
export class RegistroService {
  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
    const datos = await this.findAll();
    const id = datos[0] ? setId(datos[datos.length - 1].id).toString() : setId(0);
    const newRegistro = { ...createRegistroDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newRegistro),
    });
    const parsed = res.json();
    return parsed;
  }

  async findAll(): Promise<Registro[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Registro|null> {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok) return null;
    const parsed = res.json();
    return parsed;
  }

  async update(id: number, updateRegistroDto: UpdateRegistroDto) {
    const isRegistro = await this.findOne(id);
    if(!isRegistro)return;
    const updateRegistro = {...updateRegistroDto,id};
    const res = await fetch(`${baseUrl}/${id}`,{
      method: "PATCH",
      headers:{
        'Content-type':'Application-json',
      },
      body: JSON.stringify(updateRegistro)
    });
    const parsed = res.json()
    return parsed;
  }

  async remove(id: number):Promise<any> {
    const isRegistro = await this.findOne(id);
    if(!isRegistro)return;
    const res = await fetch(`${baseUrl}/${id}`,{
      method: "DELETE"
    });
    const parsed = res.json();
    return parsed;    
  }
}
