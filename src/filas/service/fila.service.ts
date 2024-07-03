import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { Fila } from '../entities/fila.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class FilaService {

  constructor(@InjectRepository(Fila) private readonly filaRepository : Repository<Fila>){}

  async findAll(): Promise<Fila[]> {
    try{
      let filas: Fila[] = await this.filaRepository.find();
      if (filas.length != 0) return filas;
      else throw new Error('No se encontraron filas')
  } catch(error){
    throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
  }
}

  async findOne(id: string): Promise<Fila> {
    try{
      let criterio : FindOneOptions = {where: { filaId: id }};
      let fila : Fila = await this.filaRepository.findOne(criterio);
      if (fila) return fila;
      else throw new Error (`No se encontró la fila: ${id}`)
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async create(createFilaDto: CreateFilaDto): Promise<Fila> {
    try{
      let fila: Fila = await this.filaRepository.save(new Fila(createFilaDto.filaAciertos));
      if (fila) return fila;
      else throw new Error('No se pudo crear la fila');
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateFilaDto: Partial<CreateFilaDto>): Promise<Fila> {
    try {
      let criterio : FindOneOptions = {where: {filaId: id}};
      let fila : Fila = await this.filaRepository.findOne(criterio);
      if (!fila) throw new Error('No se encuentra la fila');
      else
        fila.setAciertos(updateFilaDto.filaAciertos);     
        fila = await this.filaRepository.save(fila);
        return fila;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      let criterio : FindOneOptions = {where: {filaId: id}};
      let fila : Fila = await this.filaRepository.findOne(criterio);
      if (!fila) throw new Error('No se encuentra la fila');
      else
        await this.filaRepository.delete(id);
        return true;
      } catch (error) {
        throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
      }
    }
}
