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
    const id = datos[0] ? setId(datos[datos.length - 1].id) : setId(0);
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

  async findOne(id: number): Promise<Registro> {
    const res = await fetch(`${baseUrl}/${id}`);

    const parsed = res.json();
    return parsed;
  }

  update(id: number, updateRegistroDto: UpdateRegistroDto) {
    return `This action updates a #${id} registro`;
  }

  remove(id: number) {
    return `This action removes a #${id} registro`;
  }
}
