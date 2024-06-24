import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { setId } from 'src/funciones/funciones';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

const baseUrl = 'http://localhost:3030/sala/'

@Injectable()
export class SalaService {
  constructor(@InjectRepository(Sala) private readonly salaRepository: Repository<Sala>){}
  async create(createSalaDto: CreateSalaDto):Promise<Sala> {
    try{
      let sala: Sala = await this.salaRepository.save(new Sala(
      ));
      if (sala)
        return sala;
      else
      throw new Error('No se pudo crear la sala');
    } catch (error){
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Error en la creación de la sala'+error}, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Sala[]> {
    let salas: Sala[] = await this.salaRepository.find();
    return salas;
  }

  async findOne(id: number): Promise<Sala> {
    let criterio : FindOneOptions = {where: {salaId: id }};
    let sala : Sala = await this.salaRepository.findOne(criterio);
    return sala;
  }
  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    try {
      let criterio : FindOneOptions = {where: {salaId: id}};
      let sala : Sala = await this.salaRepository.findOne(criterio);
      if (!sala)
        throw new Error('No se encuentra la sala');
      else
      sala = await this.salaRepository.save(sala);
      return sala;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:'Error en la actualización de la sala' +error},HttpStatus.NOT_FOUND);
    }
  }
  async remove(id: number): Promise<boolean> {
    try {
      let criterio : FindOneOptions = {where: {salaId: id}};
      let sala : Sala = await this.salaRepository.findOne(criterio);
      if (!sala)
      throw new Error('No se encuentra la sala');
      else
      await this.salaRepository.delete(id);
      return true;
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
      error : 'Error en la eliminacion de la sala '+error}, HttpStatus.NOT_FOUND);
    }
  }
}
