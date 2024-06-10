import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptions, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { setId } from '../funciones/funciones';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

const baseUrl = 'http://localhost:3030/usuarios';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>){}
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    /*const datos = await this.findAll();
    const id = datos[0] ? setId(datos[datos.length - 1].id).toString() : setId(0);
    const newUser = { ...createUsuarioDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const parsed = res.json();
    return parsed;*/
    const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto)
    return this.usuarioRepository.save(nuevoUsuario)
  }

  async findAll(): Promise<Usuario[]> {
    /*const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;*/
    const usuarios = this.usuarioRepository.find();
    return usuarios
  };

  async findOne(id: number): Promise<Usuario> {    
      /*const res = await fetch(`${baseUrl}/${id}`);
      if(!res.ok)return;
      const parsed = await res.json();      
      return parsed;*/
      const criterio : FindOneOptions = { where: { id: id } }
      const usuario = await this.usuarioRepository.findOne(criterio)
      return usuario;      
  };
  
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      const criterio : FindOneOptions = { where: { id: id } }
      let usuario = await this.usuarioRepository.findOne(criterio)

      if(!usuario){
        throw new BadRequestException(`No se encuentra el usuario con id ${id}`)
      }else{
        usuario.apellido=(updateUsuarioDto.apellido)
        usuario.nombre = (updateUsuarioDto.nombre)
        usuario.direccion = (updateUsuarioDto.direccion)
        usuario.celular = (updateUsuarioDto.celular)
        usuario.administrador = (updateUsuarioDto.administrador)
        usuario = await this.usuarioRepository.save(usuario)
      }
      return usuario;

      
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : 'Error en la actualizacion del usuario '+error}, HttpStatus.NOT_FOUND);
      
    }
    
    
    /*const isUser = await this.findOne(id);
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
    }*/
   return    
  };

  async remove(id: number):Promise<Usuario> {
    /*const isUser = await this.findOne(id);
    if(!isUser)return;
    const res = await fetch(`${baseUrl}/${id}`,{
      method: "DELETE",      
    });
    const parsed = res.json();
    return parsed;*/
    try {
      const criterio : FindOneOptions = { where: { id: id } }
      let usuario = await this.usuarioRepository.findOne(criterio)

      if(!usuario){
        throw new BadRequestException(`No se encuentra el usuario con id ${id}`)
      }else{
       await this.usuarioRepository.delete(id)
      }
      return usuario;

      
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : 'Error en la eliminación del usuario '+error}, HttpStatus.NOT_FOUND);


  };
   
  }
}

