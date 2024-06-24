import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Carton } from '../entities/carton.entity';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository } from 'typeorm';

const BASE_URL = 'http://localhost:3030/cartones';
@Injectable()
export class CartonService {   

  constructor(@InjectRepository(Carton) private readonly cartonRepository : Repository <Carton>){}
  public async findAll(): Promise<Carton[]> {
    let cartones: Carton[] = await this.cartonRepository.find();
    return cartones;
  }

  public async findById(id: number): Promise<Carton> { 
    let criterio : FindOneOptions = {where: {cartonId: id}};
    let carton: Carton = await this.cartonRepository.findOne(criterio);
    return carton;
  }

  async create(createCartonDto: CreateCartonDto): Promise<Carton> {
    try{
      let carton: Carton = await this.cartonRepository.save(new Carton(
        createCartonDto.nroCarton, createCartonDto.aciertos
      ));
      if (carton)
        return carton;
      else
      throw new Error('No se pudo crear el cartón');
    } catch (error){
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Error en la creación del cartón'+error}, HttpStatus.NOT_FOUND);
    }
  }
  async update(id: number, updateCartonDto: UpdateCartonDto ): Promise<Carton> {
    try {
      let criterio : FindOneOptions = {where: {cartonId: id}};
      let carton : Carton = await this.cartonRepository.findOne(criterio);
      if (!carton)
        throw new Error('No se encuentra el cartón');
      else
      carton.setNroCarton(updateCartonDto.nroCarton);
      carton.setaciertos(updateCartonDto.aciertos);
      carton = await this.cartonRepository.save(carton);
      return carton;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:'Error en la actualización del cartón' +error},HttpStatus.NOT_FOUND);
    }
  }
  async delete(id: number):Promise<boolean>{
    try {
      let criterio : FindOneOptions = {where: {cartonId: id}};
      let carton : Carton = await this.cartonRepository.findOne(criterio);
      if (!carton)
      throw new Error('No se encuentra el carton');
      else
      await this.cartonRepository.delete(id);
      return true;
      } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
      error : 'Error en la eliminacion del cartón '+error}, HttpStatus.NOT_FOUND);
      }
  }
}
