import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';
import { Casillero } from '../entities/casillero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Fila } from 'src/filas/entities/fila.entity';

@Injectable()
export class CasilleroService {
  constructor(
    @InjectRepository(Casillero)
    private readonly casilleroRepository: Repository<Casillero>,
    @InjectRepository(Fila) private readonly filaRepository: Repository<Fila>,
  ) {}

  async findAll(): Promise<Casillero[]> {
    try {
      let casilleros: Casillero[] = await this.casilleroRepository.find();
      if (casilleros.length != 0) return casilleros;
      else throw new Error('No se encontraron casilleros');
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

  async findOne(id: string): Promise<Casillero> {
    try {
      let criterio: FindOneOptions = { where: { casilleroId: id } };
      let casillero: Casillero =
        await this.casilleroRepository.findOne(criterio);
      if (casillero) return casillero;
      else throw new Error(`No se encontró el casillero: ${id}`);
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

  async create(createCasilleroDto: CreateCasilleroDto): Promise<Casillero> {
    try {
      const fila = await this.filaRepository.findOne({
        where: { filaId: createCasilleroDto.filaId },
      });
      if (!fila) {
        throw new Error('Fila no encontrada');
      }
      const casillero = this.casilleroRepository.create({
        fila: createCasilleroDto.filaId,
        imagen: createCasilleroDto.imagen });
      const nuevoCasillero = await this.casilleroRepository.save(casillero);
      if (nuevoCasillero) return nuevoCasillero;
      else throw new Error('No se pudo crear el casillero');
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
    id: string,
    updateCasilleroDto: UpdateCasilleroDto,
  ): Promise<Casillero> {
    try {
      let criterio: FindOneOptions = { where: { casilleroId: id } };
      let casillero: Casillero =
        await this.casilleroRepository.findOne(criterio);
      if (!casillero) throw new Error('No se encuentra el casillero');
      else casillero.setSalio(updateCasilleroDto.salio);
      casillero = await this.casilleroRepository.save(casillero);
      return casillero;
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

  async delete(id: string) {
    try {
      let criterio: FindOneOptions = { where: { casilleroId: id } };
      let casillero: Casillero =
        await this.casilleroRepository.findOne(criterio);
      if (!casillero) throw new Error('No se encuentra el casillero');
      else await this.casilleroRepository.delete(id);
      return `Se ha eliminado el casillero: ${id}`;
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
