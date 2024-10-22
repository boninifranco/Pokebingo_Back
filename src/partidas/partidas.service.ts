import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Sala } from 'src/sala/entities/sala.entity';

@Injectable()
export class PartidasService {
  constructor(
    @InjectRepository(Partida)
    private readonly partidaRepository: Repository<Partida>,
    @InjectRepository(Sala) private readonly salaRepository: Repository<Sala>,
  ) {}
  async create(createPartidaDto: CreatePartidaDto): Promise<Partida> {
    try {
      const sala = await this.salaRepository.findOne({
        where: { salaId: createPartidaDto.salaId },
      });
      if (!sala) {
        throw new Error('Sala no encontrada');
      }

      /*const partida = this.partidaRepository.create({
        horaInicio: createPartidaDto.horaInicio,
        cantidadCartones: createPartidaDto.cantidadCartones,
        estadoPartida: createPartidaDto.estadoPartida,
        salaId: createPartidaDto.salaId,
      });*/
      const partida = this.partidaRepository.create(createPartidaDto)

      const nuevaPartida = await this.partidaRepository.save(partida);
      if (nuevaPartida) return nuevaPartida;
      else throw new Error('No se pudo crear el chat');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Partida[]> {
    try {
      let criterio: FindManyOptions = { relations: ['cartones'] };
      let partidas: Partida[] = await this.partidaRepository.find(criterio);
      if (partidas.length != 0) return partidas;
      else throw new Error('No se encontraron torneos');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<Partida> {
    try {
      let criterio: FindOneOptions = {
        relations: ['cartones'],
        where: { partidaId: id },
      };
      let partida: Partida = await this.partidaRepository.findOne(criterio);
      if (partida) return partida;
      else throw new Error(`No se encontró el torneo: ${id}`);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    UpdatePartidaDto: UpdatePartidaDto,
  ): Promise<Partida> {
    try {
      let criterio: FindOneOptions = { where: { partidaId: id } };
      let partida: Partida = await this.partidaRepository.findOne(criterio);
      if (!partida) throw new Error('No se encuentra la partida');
      else partida.setHoraInicio(UpdatePartidaDto.horaInicio);
      partida.setCantidadCartones(UpdatePartidaDto.cantidadCartones);
      partida.setEstadoPartida(UpdatePartidaDto.estadoPartida);
      partida = await this.partidaRepository.save(partida);
      return partida;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async remove(id: number) {
    try {
      let criterio: FindOneOptions = { where: { partidaId: id } };
      let partida: Partida = await this.partidaRepository.findOne(criterio);
      if (!partida) throw new Error('No se encuentra la partida');
      else await this.partidaRepository.delete(id);
      return `Se ha eliminado la partida: ${id}`;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
