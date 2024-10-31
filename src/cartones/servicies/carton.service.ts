import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Carton } from '../entities/carton.entity';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, IsNull, Repository } from 'typeorm';
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
      let criterio: FindManyOptions = { relations: ['fila'],
        
       };
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

  public async getAllCartones(criterio: string, orden: 'ASC' | 'DESC', partida: Partida):Promise<Carton[]> {
    /*const cartones = await this.cartonRepository.find({
      relations:['fila', 'fila.casillero', 'fila.casillero.imagenId'],
      where: {idUsuario: },
      order:{[criterio]: orden}
    })*/
      const cartones = await this.cartonRepository
      .createQueryBuilder('carton')
      .leftJoinAndSelect('carton.idUsuario', 'idUsuario')
      .innerJoinAndSelect('carton.partida', 'partida')
      .leftJoinAndSelect('carton.fila', 'fila')
      .leftJoinAndSelect('fila.casillero', 'casillero')
      .leftJoinAndSelect('casillero.imagenId', 'imagenId')
      .where('carton.idUsuario IS NOT NULL')
      .andWhere('carton.partida = :partida', {partida})
      .orderBy(`carton.${criterio}`, orden)
      .getMany();
    return cartones
  } 

  public async findOne(id: number): Promise<Carton> {
    try {
      let criterio: FindOneOptions = {
        relations: ['fila'],
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

  //async createMany(cartones: CreateCartonDto[]): Promise<Carton[]> {
  async create(createCartonDto: CreateCartonDto): Promise<Carton> {
    try {
      let partida = await this.partidaRepository.findOne({
        //where: { partidaId: cartones[0].idPartida },
        where: { partidaId: createCartonDto.idPartida.partidaId }
      });
      if (!partida) {
        throw new Error('Partida no encontrada');
      }
      const carton = this.cartonRepository.create({
        partida: createCartonDto.idPartida,
        idUsuario: createCartonDto.idUsuario
      });
      const nuevoCarton = await this.cartonRepository.save(carton);
      // Convierte los Dto en entidades para insertar en la base de datos
      // Primero asegúrate de que el idPartida está siendo pasado correctamente
    /*cartones.forEach(carton => {
      console.log('Asignando idPartida:', carton.idPartida); // Para verificar que el idPartida existe

    });
    const nuevosCartones = cartones.map(carton => this.cartonRepository.create(carton));

    // Guardar todos los cartones
    const nuevoCarton = this.cartonRepository.save(nuevosCartones);*/
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
      if(updateCartonDto.aciertos){
        carton.setaciertos(updateCartonDto.aciertos);
      }     
      carton.idUsuario = updateCartonDto.idUsuario;
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

  public async actualizarAciertosCarton(cartonId: number, aciertos: number): Promise<Carton> {
    const carton = await this.cartonRepository.findOne({ where: { cartonId: cartonId } });
  
    if (!carton) {
      throw new NotFoundException('Cartón no encontrado');
    }
  
    carton.aciertos = aciertos;  // Actualizar los aciertos
    return await this.cartonRepository.save(carton);  // Guardar en la base de datos
  }

  public async cantidadDeCartonesPorPartida() {
    const resultado = await this.cartonRepository
      .createQueryBuilder('carton')
      .select('carton.idPartida', 'idPartida') 
      .addSelect('COUNT(carton.cartonId)', 'cantidad') 
      .groupBy('carton.idPartida') 
      .getRawMany(); 

    return resultado;
  }
  
}
