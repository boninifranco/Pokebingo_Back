import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { setId } from '../funciones/funciones';

const baseUrl = 'http://localhost:3030/usuarios';

@Injectable()
export class UsuarioService {
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const datos = await this.findAll();
    const id = datos[0] ? setId(datos[datos.length - 1].id) : setId(0);
    const newUser = { ...createUsuarioDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const parsed = res.json();
    return parsed;
  }

  async findAll(): Promise<Usuario[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<Usuario> {
    const res = await fetch(`${baseUrl}/${id}`);
    //baseUrl+`${+id}`
    const parsed = await res.json();
    return parsed;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
