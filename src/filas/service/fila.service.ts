import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { Fila } from '../entities/fila.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpdateFilaDto } from '../dto/update-fila.dto';
import { Carton } from 'src/cartones/entities/carton.entity';

@Injectable()
export class FilaService {
  constructor(
    @InjectRepository(Fila) private readonly filaRepository: Repository<Fila>,
    @InjectRepository(Carton)
    private readonly cartonRepository: Repository<Carton>,
  ) {}

  async findAll(): Promise<Fila[]> {
    try {
      let criterio: FindManyOptions = { relations: ['casilleros'] };
      let filas: Fila[] = await this.filaRepository.find(criterio);
      if (filas.length != 0) return filas;
      else throw new Error('No se encontraron filas');
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

  async findOne(id: string): Promise<Fila> {
    try {
      let criterio: FindOneOptions = {
        relations: ['casilleros'],
        where: { filaId: id },
      };
      let fila: Fila = await this.filaRepository.findOne(criterio);
      if (fila) return fila;
      else throw new Error(`No se encontró la fila: ${id}`);
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

  async create(createFilaDto: CreateFilaDto): Promise<Fila> {
    try {
      const carton = await this.cartonRepository.findOne({
        where: { cartonId: createFilaDto.cartonId },
      });
      if (!carton) {
        throw new Error('Cartón no encontrado');
      }
      const fila = this.filaRepository.create({
        carton: carton,
      });
      const nuevaFila = await this.filaRepository.save(fila);
      if (nuevaFila) return nuevaFila;
      else throw new Error('No se pudo crear la fila');
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
    updateFilaDto: Partial<UpdateFilaDto>,
  ): Promise<Fila> {
    try {
      let criterio: FindOneOptions = { where: { filaId: id } };
      let fila: Fila = await this.filaRepository.findOne(criterio);
      if (!fila) throw new Error('No se encuentra la fila');
      else fila.setAciertos(updateFilaDto.filaAciertos);
      fila = await this.filaRepository.save(fila);
      return fila;
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
      let criterio: FindOneOptions = { where: { filaId: id } };
      let fila: Fila = await this.filaRepository.findOne(criterio);
      if (!fila) throw new Error('No se encuentra la fila');
      else await this.filaRepository.delete(id);
      return `Se ha eliminado la fila: ${id}`;
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
