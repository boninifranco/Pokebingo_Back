
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDesempenioDto } from './dto/create-desempeno.dto';
import { UpdateDesempenioDto } from './dto/update-desempeno.dto';
import { Desempenio } from './entities/desempeno.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DesempenioService {

  constructor(@InjectRepository(Desempenio)    
    private readonly desempenioRepository : Repository<Desempenio>
  ){}

  async create(createDesempenioDto: CreateDesempenioDto): Promise<Desempenio> {
    try {
      const newDesempeno: Desempenio = this.desempenioRepository.create(createDesempenioDto)
      return this.desempenioRepository.save(newDesempeno);      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error}, HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<Desempenio[]> {
    try {      
      const desempenio = await this.desempenioRepository.find()
      if(!desempenio) throw new BadRequestException(`No se encuentran desempeños en la base de datos`)
      return desempenio;
      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error}, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<Desempenio> {
    try {
      const criterio : FindOneOptions = {where:{ id : id}};
      const desempenio = await this.desempenioRepository.findOne(criterio);
      if(!desempenio) throw new BadRequestException(`No existe el desempeño con id ${id}`);
      return desempenio;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error}, HttpStatus.NOT_FOUND)      
    }    
  }

  async update(id: number, updateDesempenioDto: UpdateDesempenioDto): Promise<Desempenio> {
    try {
      const criterio :FindOneOptions = {where:{id:id}};
      let desempenio = await this.desempenioRepository.findOne(criterio);
      if(!desempenio) throw new BadRequestException(`No se encuentra el desempenio con id ${id}`);
      desempenio.jugador = (updateDesempenioDto.jugador);
      desempenio.creditos = (updateDesempenioDto.creditos);
      desempenio.puntos = (updateDesempenioDto.puntos);
      desempenio.cartonesComprados = (updateDesempenioDto.cartonesComprados);
      await this.desempenioRepository.update(id,desempenio)
      return desempenio;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error}, HttpStatus.NOT_FOUND);
    }    
  }

  async remove(id: number) {
    try {
      const criterio : FindOneOptions = {where:{id:id}};
      const desempenio = await this.desempenioRepository.findOne(criterio);
      if(!desempenio) throw new BadRequestException(`No se encuentra el desempenio con id ${id}`);
      await this.desempenioRepository.delete(desempenio);
      return desempenio;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error}, HttpStatus.NOT_FOUND);
    }    
  }
}