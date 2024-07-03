import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePremiosDto } from './dto/create-premios.dto';
import { UpdatePremiosDto } from './dto/update-premios.dto';
import { Premios } from './entities/premios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PremiosService {  
  constructor(@InjectRepository(Premios)
    private readonly premiosReposirory : Repository<Premios>
  ){}
  async create(createPremiosDto: CreatePremiosDto): Promise<Premios> {
    try {
      const premio: Premios = this.premiosReposirory.create(createPremiosDto)
      return await this.premiosReposirory.save(premio);      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)
    }    
  }

  async findAll(): Promise<Premios[]> {
    try {
      const premios = await this.premiosReposirory.find();
      if(premios.length===0) throw new BadRequestException(`No se encontraron premios en la base de datos`)
      return premios;
      } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)
    }    
  }

  async findOne(id: number): Promise<Premios> {
    try {
      const criterio: FindOneOptions = {where:{ id:id}};
      const premio = await this.premiosReposirory.findOne(criterio);
      if(!premio) throw new BadRequestException(`No se encontró el premio con el id ${id} en la base de datos`)
      return premio;

    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async update(id: number, updatePremiosDto: UpdatePremiosDto): Promise<Premios> {
    try {
      const criterio: FindOneOptions = {where:{ id:id}};
      let premio = await this.premiosReposirory.findOne(criterio);
      if(!premio) throw new BadRequestException(`No se encontró el premio con el id ${id} en la base de datos`)
        premio.descripcion = (updatePremiosDto.descripcion)
        premio.creditos = (updatePremiosDto.creditos)
        await this.premiosReposirory.update(id,premio)       
      return premio;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async remove(id: number){
    try {
      const criterio: FindOneOptions = {where:{ id:id}};
      const premio = await this.premiosReposirory.findOne(criterio);
      if(!premio) throw new BadRequestException(`No se encontró el premio con el id ${id} en la base de datos`)
      await this.premiosReposirory.delete(id)
        return `Se ha eliminado el premio con id ${id}`;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:`Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }        
  };
}
