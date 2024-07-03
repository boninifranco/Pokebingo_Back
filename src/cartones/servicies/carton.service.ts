import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Carton } from '../entities/carton.entity';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CartonService {   

  constructor(@InjectRepository(Carton) private readonly cartonRepository : Repository <Carton>){}

  public async findAll(): Promise<Carton[]> {
    try{
      let cartones: Carton[] = await this.cartonRepository.find();
      if (cartones.length != 0) return cartones;
      else throw new Error ('No se encontraron cartones')
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  public async findById(id: number): Promise<Carton> { 
    try{
      let criterio : FindOneOptions = {where: {cartonId: id}};
      let carton: Carton = await this.cartonRepository.findOne(criterio);
      if (carton) return carton;
      else throw new Error(`No se encontró el cartón: ${id} `);
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async create(createCartonDto: CreateCartonDto): Promise<Carton> {
    try{
      let carton: Carton = await this.cartonRepository.save(new Carton(
        createCartonDto.nroCarton, createCartonDto.aciertos
      ));
      if (carton) return carton;
      else throw new Error('No se pudo crear el cartón');
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }
  async update(id: number, updateCartonDto: UpdateCartonDto ): Promise<Carton> {
    try {
      let criterio : FindOneOptions = {where: {cartonId: id}};
      let carton : Carton = await this.cartonRepository.findOne(criterio);
      if (!carton) throw new Error(`No se encuentra el cartón: ${id}`);
      else
        carton.setNroCarton(updateCartonDto.nroCarton);
        carton.setaciertos(updateCartonDto.aciertos);
        carton = await this.cartonRepository.save(carton);
      return carton;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }
  async delete(id: number):Promise<boolean>{
    try {
      let criterio : FindOneOptions = {where: {cartonId: id}};
      let carton : Carton = await this.cartonRepository.findOne(criterio);
      if (!carton)
      throw new Error(`No se encuentra el carton: ${id}`);
      else
      await this.cartonRepository.delete(id);
      return true;
      } catch (error) {
        throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
      }
  }
}
