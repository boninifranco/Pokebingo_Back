import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TorneosService {
  constructor(
    @InjectRepository(Torneo)
    private readonly torneoRepository: Repository<Torneo>,
  ) {}

  async create(createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    try {
      let torneo: Torneo = await this.torneoRepository.save(
        new Torneo(
          createTorneoDto.nroTorneo,
          createTorneoDto.fecha,
          createTorneoDto.horaInicio,
          createTorneoDto.horaCierre,
        ),
      );
      if (torneo) return torneo;
      else throw new Error('No se pudo crear el torneo');
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

  async findAll(): Promise<Torneo[]> {
    try {
      let torneos: Torneo[] = await this.torneoRepository.find();
      if (torneos.length != 0) return torneos;
      else throw new Error('No se econtraron torneos');
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
  async findOne(id: number): Promise<Torneo> {
    try {
      let criterio: FindOneOptions = { where: { torneoId: id } };
      let torneo: Torneo = await this.torneoRepository.findOne(criterio);
      if (torneo) return torneo;
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
  async update(id: number, UpdateTorneoDto: UpdateTorneoDto): Promise<Torneo> {
    try {
      let criterio: FindOneOptions = { where: { torneoId: id } };
      let torneo: Torneo = await this.torneoRepository.findOne(criterio);
      if (!torneo) throw new Error(`No se encuentra el torneo ${id}`);
      else torneo.setNroTorneo(UpdateTorneoDto.nroTorneo);
      torneo.setFecha(UpdateTorneoDto.fecha);
      torneo.setHoraInicio(UpdateTorneoDto.horaInicio);
      torneo.setHoraCierre(UpdateTorneoDto.horaCierre);
      torneo = await this.torneoRepository.save(torneo);
      return torneo;
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
      let criterio: FindOneOptions = { where: { torneoId: id } };
      let torneo: Torneo = await this.torneoRepository.findOne(criterio);
      if (!torneo) throw new Error(`No se encuentra el torneo ${id}`);
      else await this.torneoRepository.delete(id);
      return `Se ha eliminado el torneo: ${id}`;
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
