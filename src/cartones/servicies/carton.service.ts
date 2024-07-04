import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Carton } from '../entities/carton.entity';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Logueo } from 'src/logueo/entities/logueo.entity';

@Injectable()
export class CartonService {
  constructor(
    @InjectRepository(Carton)
    private readonly cartonRepository: Repository<Carton>,
    @InjectRepository(Partida)
    private readonly partidaRepository: Repository<Partida>,
    @InjectRepository(Logueo)
    private readonly logueoRepository: Repository<Logueo>,
  ) {}

  public async findAll(): Promise<Carton[]> {
    try {
      let criterio: FindManyOptions = { relations: ['fila'] };
      let cartones: Carton[] = await this.cartonRepository.find(criterio);
      if (cartones.length != 0) return cartones;
      else throw new Error('No se encontraron cartones');
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

  public async findOne(id: number): Promise<Carton> {
    try {
      let criterio: FindOneOptions = {
        relations: ['filas'],
        where: { cartonId: id },
      };
      let carton: Carton = await this.cartonRepository.findOne(criterio);
      if (carton) return carton;
      else throw new Error(`No se encontró el cartón: ${id} `);
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

  async create(createCartonDto: CreateCartonDto): Promise<Carton> {
    try {
      let partida = await this.partidaRepository.findOne({
        where: { partidaId: createCartonDto.idPartida },
      });
      if (!partida) {
        throw new Error('Partida no encontrada');
      }
      const carton = this.cartonRepository.create({
        partida: partida,
      });
      const nuevoCarton = await this.cartonRepository.save(carton);
      if (nuevoCarton) return nuevoCarton;
      else throw new Error('No se pudo crear el cartón');
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

  async update(id: number, updateCartonDto: UpdateCartonDto): Promise<Carton> {
    try {
      let criterio: FindOneOptions = { where: { cartonId: id } };
      let carton: Carton = await this.cartonRepository.findOne(criterio);
      if (!carton) throw new Error(`No se encuentra el cartón: ${id}`);
      carton.setaciertos(updateCartonDto.aciertos);
      carton.idUsuario = updateCartonDto.idUsuario;
      // carton.setidUsuario(updateCartonDto.idUsuario);
      carton = await this.cartonRepository.save(carton);
      return carton;
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
  async delete(id: number) {
    try {
      let criterio: FindOneOptions = { where: { cartonId: id } };
      let carton: Carton = await this.cartonRepository.findOne(criterio);
      if (!carton) throw new Error(`No se encuentra el cartón: ${id}`);
      else await this.cartonRepository.delete(id);
      return `Se ha eliminado el cartón: ${id}`;
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
