import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';
import { setId } from 'src/funciones/funciones';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

const baseUrl = 'http://localhost:3030/torneos/';

@Injectable()
export class TorneosService {
  constructor(@InjectRepository(Torneo) private readonly torneoRepository: Repository<Torneo>){}
  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    try{
      let torneo: Torneo = await this.torneoRepository.save(new Torneo(
        createTorneoDto.nroTorneo, createTorneoDto.fecha, createTorneoDto.horaInicio, createTorneoDto.horaCierre
      ));
      if (torneo)
        return torneo;
      else
      throw new Error('No se pudo crear el torneo');
    } catch (error){
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Error en la creación del torneo'+error}, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Torneo[]> {
    let torneos: Torneo[] = await this.torneoRepository.find();
    return torneos;
  }
  async findOne(id: number): Promise<Torneo> {
    let criterio : FindOneOptions = {where: { id }};
    let torneo : Torneo = await this.torneoRepository.findOne(criterio);
    return torneo;
  }
  async update(id: number, UpdateTorneoDto: UpdateTorneoDto): Promise<Torneo> {
    try {
      let criterio : FindOneOptions = {where: {id}};
      let torneo : Torneo = await this.torneoRepository.findOne(criterio);
      if (!torneo)
        throw new Error('No se encuentra el torneo');
      else
      torneo.setNroTorneo(UpdateTorneoDto.nroTorneo);
      torneo.setFecha(UpdateTorneoDto.fecha);
      torneo.setHoraInicio(UpdateTorneoDto.horaInicio);
      torneo.setHoraCierre(UpdateTorneoDto.horaCierre);
      torneo = await this.torneoRepository.save(torneo);
      return torneo;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:'Error en la actualización del torneo' +error},HttpStatus.NOT_FOUND);
    }
  }
  async remove(id: number): Promise<boolean> {
    try {
      let criterio : FindOneOptions = {where: {id}};
      let torneo : Torneo = await this.torneoRepository.findOne(criterio);
      if (!torneo)
      throw new Error('No se encuentra el torneo');
      else
      await this.torneoRepository.delete(id);
      return true;
      } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
      error : 'Error en la eliminacion del torneo '+error}, HttpStatus.NOT_FOUND);
      }
  }
}
