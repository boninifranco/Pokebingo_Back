import { MessagesWsGateway } from './../../messages-ws/messages-ws.gateway';
import {  HttpException,  HttpStatus,  Injectable } from '@nestjs/common';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { Fila } from '../entities/fila.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, LessThanOrEqual, Not, Repository } from 'typeorm';
import { UpdateFilaDto } from '../dto/update-fila.dto';
import { Carton } from 'src/cartones/entities/carton.entity';
import { MessagesWsService } from 'src/messages-ws/messages-ws.service';
import { Partida } from 'src/partidas/entities/partida.entity';

//import { MessagesWsService } from 'src/messages-ws/messages-ws.service';

//import { FilasGateway } from '../filas.gateway';

@Injectable()
export class FilaService {
  constructor(
    @InjectRepository(Fila) private readonly filaRepository: Repository<Fila>,
    @InjectRepository(Carton)
    private readonly cartonRepository: Repository<Carton>,    
    //private readonly messagesWsGateway: MessagesWsGateway, // Inyectamos el gateway
  ) {}

  async findAll(): Promise<Fila[]> {
    try {
      let criterio: FindManyOptions = { relations: ['casillero']
       };
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
  async obtenerUsuarioDeFila(filaId: number):Promise<Fila>{
    // Realiza la consulta a la base de datos
    const fila = await this.filaRepository.findOne({
      where: { filaId: filaId },
      relations: ['carton','carton.idUsuario', 'carton.idUsuario'], // Incluye las relaciones necesarias
    });

    // Verifica que la fila y sus relaciones existan
    //if (!fila || !fila.carton || !fila.carton.usuarioId) {
      //throw new Error('No se encontró el usuario asociado a la fila');
    //}

    // Retorna el usuario asociado a la fila
    console.log(fila.carton)
    return fila;
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
        carton: createFilaDto.cartonId,
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
      // Después de actualizar, emitimos la actualización a todos los clientes

      
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

  public async getAciertosPorCarton(cartonId: number): Promise<number> {
    const filas = await this.filaRepository
      .createQueryBuilder('fila')
      .select('SUM(fila.aciertos)', 'aciertosTotales')
      .where('fila.cartonId = :cartonId', { cartonId })
      .getRawOne();
  
    return filas.aciertosTotales || 0;  // Retorna 0 si no hay filas
  }

  /*public async findAllDesc(): Promise<Fila[]> {
    try {
      let criterio: FindManyOptions = { relations: ['carton'],
        order:{aciertos: 'DESC'}
       };
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
}*/

async findAllDesc(partida: Partida, aciertos: number): Promise<Fila[]> {
  try {
    /*let criterio: FindManyOptions = { relations: ['carton'],
      where: {
        aciertos: LessThanOrEqual(aciertos), 
        carton: {
          idUsuario: Not(null) // Condición para que idUsuario no sea null
        }
      },
      order:{aciertos: 'DESC'}
      //LessThanOrEqual(aciertos)
     };
    let filas: Fila[] = await this.filaRepository.find(criterio);*/
    const filas = await this.filaRepository
  .createQueryBuilder('fila')
  .innerJoinAndSelect('fila.carton', 'carton')
  .innerJoinAndSelect('carton.partida', 'partida')
  .where('fila.aciertos <= :aciertos', { aciertos })
  .andWhere('carton.idUsuario IS NOT NULL')
  .andWhere('carton.partida = :partida', {partida})
  .orderBy('fila.aciertos', 'DESC')
  .getMany();
    if (filas.length != 0){
      //this.MessagesWsGateway.wss.emit('updatedFilas', filas)
      return filas;
    } 
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

}
