import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { setId } from '../funciones/funciones';

const baseUrl = 'http://localhost:3030/usuarios';

@Injectable()
export class UsuarioService {
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const datos = await this.findAll();
    const id = datos[0] ? setId(datos[datos.length - 1].id).toString() : setId(0);
    const newUser = { ...createUsuarioDto, id};
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const parsed = res.json();
    return parsed;
  };

  async findAll(): Promise<Usuario[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  };

  async findOne(id: number): Promise<Usuario|null> {    
      const res = await fetch(`${baseUrl}/${id}`);
      if(!res.ok)return null;
      const parsed = await res.json();      
      return parsed;      
  };
  
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario|null> {
    const isUser = await this.findOne(id);
    if(!isUser)return;    
    try {
    const updateUser = {...updateUsuarioDto,id};
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateUser),
    });
    const parsed = res.json();
    return parsed;
    } catch (error) {
      throw new Error(error);      
    }    
  };

  async remove(id: number):Promise<any> {
    const isUser = await this.findOne(id);
    if(!isUser)return;
    const res = await fetch(`${baseUrl}/${id}`,{
      method: "DELETE",      
    });
    const parsed = res.json();
    return parsed;        
  };
   
  }

