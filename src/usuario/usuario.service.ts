import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptions, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>){}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const criterio: FindOneOptions = {where:{dni: createUsuarioDto.dni}};
    console.log(criterio)
    const isUsuario = await this.usuarioRepository.findOne(criterio);
    console.log(isUsuario)
    if(isUsuario) throw new BadRequestException(`El usuario con dni ${createUsuarioDto.dni} ya existe`)
    try {
      const nuevoUsuario = this.usuarioRepository.create(createUsuarioDto)
    return this.usuarioRepository.save(nuevoUsuario)
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
    } 
  }

  async findAll(): Promise<Usuario[]> {
        try {
          const usuarios = await this.usuarioRepository.find();
          if(usuarios.length==0){
            throw new BadRequestException(`No existen usuarios en la base de datos`)
          }
          return usuarios;          
        } catch (error) {
            throw new HttpException( { status : HttpStatus.NOT_FOUND,
            error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);          
        }        
  };


  async findOne(id: number): Promise<Usuario> {
      try {
        const criterio : FindOneOptions = { where: { id: id } }
        const usuario = await this.usuarioRepository.findOne(criterio)
        if(!usuario) throw new BadRequestException(`Usuario con id ${id} no encontrado`)
        return usuario;        
      } catch (error) {
        throw new HttpException( { status : HttpStatus.NOT_FOUND,
          error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
      }            
  };
  
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {      
      const criterio : FindOneOptions = { where: { id: id } }      
      let usuario= await this.usuarioRepository.findOne(criterio);
      if(!usuario){
        throw new BadRequestException(`No se encuentra el usuario con id ${id}`)
      }else{
        usuario.apellido=(updateUsuarioDto.apellido)
        usuario.nombre = (updateUsuarioDto.nombre)
        usuario.direccion = (updateUsuarioDto.direccion)
        usuario.celular = (updateUsuarioDto.celular)
        usuario.administrador = (updateUsuarioDto.administrador)
        console.log(usuario)
        await this.usuarioRepository.update(id,usuario)
      }
      return usuario;      
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);      
    }      
  };

  async remove(id: number) {    
    try {
      const criterio : FindOneOptions = { where: { id: id } }
      let usuario = await this.usuarioRepository.findOne(criterio);
      if(!usuario){
        throw new BadRequestException(`No se encuentra el usuario con id ${id}`)
      }else{
       await this.usuarioRepository.delete(id)
      }
      return `Se ha eliminado el usuario con id ${id} (${usuario.apellido}, ${usuario.nombre})`;      
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
  };   
  }
}

