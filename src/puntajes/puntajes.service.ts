import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';
import { Puntajes } from './entities/puntajes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PuntajesService {
  constructor(@InjectRepository(Puntajes)
private readonly puntajesRepository : Repository<Puntajes>){};
  async create(createPuntajesDto: CreatePuntajesDto): Promise<Puntajes> {
    try {
      const puntaje = this.puntajesRepository.create(createPuntajesDto);      
      return this.puntajesRepository.save(puntaje);
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async findAll(): Promise<Puntajes[]> {
    try {
      const puntajes = await this.puntajesRepository.find();
      if(puntajes.length===0) throw new BadRequestException(`No se encuentan puntajes en la base de datos`);
      return puntajes;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }    
  }

  async findOne(id: number): Promise<Puntajes> {
    try {
      const criterio: FindOneOptions = {where:{id:id}};
      const puntaje = await this.puntajesRepository.findOne(criterio);
      if(!puntaje)throw new BadRequestException(`No se encuentra puntaje con id ${id}`)
      return puntaje;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async update(id: number, updatePuntajesDto: UpdatePuntajesDto): Promise<Puntajes> {
    try {
      const criterio: FindOneOptions = {where:{id:id}};
      let puntaje = await this.puntajesRepository.findOne(criterio);
      puntaje.descripcion = (updatePuntajesDto.descripcion);
      puntaje.puntos = (updatePuntajesDto.puntos);
      await this.puntajesRepository.update(id,puntaje);
      return puntaje;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async remove(id: number){
    try {
      const criterio: FindOneOptions = {where: {id : id}};
      const puntaje = await this.puntajesRepository.findOne(criterio);
      await this.puntajesRepository.delete(puntaje);
      return `Se ha eliminado el puntaje con id ${id}`;      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }        
  }
}
