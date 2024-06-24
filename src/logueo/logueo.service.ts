import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';
import { Logueo } from './entities/logueo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

@Injectable()
export class LogueoService {
  constructor(@InjectRepository(Logueo)    
    private readonly logueoRepository: Repository<Logueo>,    
    ){}
  
  async create(createLogueoDto: CreateLogueoDto):Promise<Logueo> {
    try {
      const nuevoLogueo: Logueo= this.logueoRepository.create(createLogueoDto);
      return this.logueoRepository.save(nuevoLogueo);      
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : 'Se produjo un error al enviar la petición '+ error}, HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<Logueo[]> {
    try {
      const logueos = await this.logueoRepository.find()
      if(logueos.length==0){
        throw new BadRequestException(`No existen logueos en la base de datos`)
      }
      return logueos      
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : 'Se produjo un error al enviar la petición '+ error}, HttpStatus.NOT_FOUND);      
    }    
  }

  async findOne(id: number):Promise<Logueo> {
    try {
      const criterio :FindOneOptions = {where:{id:id}}
      const logueo = await this.logueoRepository.findOne(criterio);
      if(!logueo) throw new BadRequestException(`No existe logueo con id ${id} en la base de datos`);
        return logueo;
      
    } catch (error) {
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error},HttpStatus.NOT_FOUND)
  }
}

  async update(id: number, updateLogueoDto: UpdateLogueoDto):Promise<Logueo> {

    try {
      const criterio : FindOneOptions = {where: { id:id }};
      let logueo = await this.logueoRepository.findOne(criterio);
      if(!logueo) throw new BadRequestException(`No se encuentra el logueo con id ${id}`);
      logueo.idUsuario = (updateLogueoDto.idUsuario);
      logueo.login = (updateLogueoDto.login);
      logueo.logout = (updateLogueoDto.logout);
      logueo.logueado = (updateLogueoDto.logueado);
      await this.logueoRepository.update(id,logueo)
      return logueo;
    } catch (error) {
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error},HttpStatus.NOT_FOUND)
      }
    }
  
  async remove(id: number):Promise<Logueo> {
    try {
      const criterio : FindOneOptions = {where: { id:id }};
      let logueo = await this.logueoRepository.findOne(criterio);
      if(!logueo) throw new BadRequestException(`No se encuentra el logueo con id ${id}`);
      await this.logueoRepository.delete(id);
      return logueo;
      
    } catch (error) {
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error},HttpStatus.NOT_FOUND)      
    }          
  }
}
