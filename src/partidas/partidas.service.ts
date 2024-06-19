import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

const baseUrl = 'http://localhost:3030/partidas/'

@Injectable()
export class PartidasService {
  constructor(@InjectRepository(Partida) private readonly partidaRepository : Repository<Partida>){}
  async create(createPartidaDto: CreatePartidaDto): Promise<Partida> {
    try{
      let partida: Partida = await this.partidaRepository.save(new Partida(
        createPartidaDto.nroPartida,createPartidaDto.horaInicio,createPartidaDto.cantidadCartones,createPartidaDto.estadoPartida
      ));
      if (partida)
        return partida;
      else
      throw new Error('No se pudo crear la partida');
    } catch (error){
      throw new HttpException({status : HttpStatus.NOT_FOUND,
        error: 'Error en la creación de la partida'+error}, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Partida[]> {
    let partidas: Partida[] = await this.partidaRepository.find();
    return partidas;
  }

  async findOne(id: number): Promise<Partida> {
    let criterio : FindOneOptions = {where: { id }};
    let partida : Partida = await this.partidaRepository.findOne(criterio);
    return partida;
  }
  async update(id: number, UpdatePartidaDto: UpdatePartidaDto): Promise<Partida> {
    try {
      let criterio : FindOneOptions = {where: {id}};
      let partida : Partida = await this.partidaRepository.findOne(criterio);
      if (!partida)
        throw new Error('No se encuentra la partida');
      else
      partida.setNroPartida(UpdatePartidaDto.nroPartida);
      partida.setHoraInicio(UpdatePartidaDto.horaInicio);
      partida.setCantidadCartones(UpdatePartidaDto.cantidadCartones);
      partida.setEstadoPartida(UpdatePartidaDto.estadoPartida);
      partida = await this.partidaRepository.save(partida);
      return partida;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error:'Error en la actualización de la partida' +error},HttpStatus.NOT_FOUND);
    }
  }
  async remove(id: number): Promise<boolean> {
    try {
    let criterio : FindOneOptions = {where: {id}};
    let partida : Partida = await this.partidaRepository.findOne(criterio);
    if (!partida)
    throw new Error('No se encuentra la partida');
    else
    await this.partidaRepository.delete(id);
    return true;
    } catch (error) {
    throw new HttpException( { status : HttpStatus.NOT_FOUND,
    error : 'Error en la eliminacion de la partida '+error}, HttpStatus.NOT_FOUND);
    }
  }
}
