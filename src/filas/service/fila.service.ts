import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { Fila } from '../entities/fila.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class FilaService {
  private readonly BASE_URL = 'http://localhost:3030/filas';

  constructor(@InjectRepository(Fila) private readonly filaRepository : Repository<Fila>){}
  async getAllFilas(): Promise<Fila[]> {
    let filas: Fila[] = await this.filaRepository.find();
    return filas;
  }

  async getFilaById(id: string): Promise<Fila> {
    let criterio : FindOneOptions = {where: { idFila: id }};
    let fila : Fila = await this.filaRepository.findOne(criterio);
    return fila;
  }

  async createFila(createFilaDto: CreateFilaDto): Promise<Fila> {
    try{
      let fila:Fila = await this.filaRepository.save(new Fila(
        createFilaDto.filaAciertos
      ));
      if (fila)
        return fila;
      else
      throw new Error('No se pudo crear la fila');
    } catch (error){
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Error en la creación de la fila'+error}, HttpStatus.NOT_FOUND);
    }
  }

  async updateFila(id: string, updateFilaDto: Partial<CreateFilaDto>): Promise<Fila> {
    try {
      let criterio : FindOneOptions = {where: {idFila: id}};
      let fila : Fila = await this.filaRepository.findOne(criterio);
      if (!fila)
        throw new Error('No se encuentra la fila');
      else
      fila.setAciertos(updateFilaDto.filaAciertos);     
      fila = await this.filaRepository.save(fila);
      return fila;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:'Error en la actualización de la fila' +error},HttpStatus.NOT_FOUND);
    }
  }

  async deleteFila(id: string): Promise<boolean> {
    try {
      let criterio : FindOneOptions = {where: {id}};
      let fila : Fila = await this.filaRepository.findOne(criterio);
      if (!fila)
      throw new Error('No se encuentra la fila');
      else
      await this.filaRepository.delete(id);
      return true;
      } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
      error : 'Error en la eliminacion de la fila '+error}, HttpStatus.NOT_FOUND);
      }
    }
}
