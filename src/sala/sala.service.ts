import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
 
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
    try{
      let criterio : FindManyOptions = {relations:['chat']}
      let salas: Sala[] = await this.salaRepository.find(criterio);
      if (salas)return salas;
      else throw new Error('No se encontraron salas');
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un erorr: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<Sala> {
    try{
      let criterio : FindOneOptions = {relations:['chat'], where: {salaId: id }};
      let sala : Sala = await this.salaRepository.findOne(criterio);
      if (sala) return sala;
      else throw new Error(`No se encontró la sala: ${id}`)
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error }, HttpStatus.NOT_FOUND);
    }
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
