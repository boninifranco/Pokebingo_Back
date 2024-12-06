import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';
import { Casillero } from '../entities/casillero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, IsNull, Repository } from 'typeorm';
import { Fila } from 'src/filas/entities/fila.entity';
import { Carton } from 'src/cartones/entities/carton.entity';

@Injectable()
export class CasilleroService {
  constructor(
    @InjectRepository(Casillero)
    private readonly casilleroRepository: Repository<Casillero>,
    @InjectRepository(Fila)
    private readonly filaRepository: Repository<Fila>,
    @InjectRepository(Carton)
    private readonly cartonRepository: Repository<Carton>,

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
        filaId: createCasilleroDto.filaId,
        imagenId: createCasilleroDto.imagenId });
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

  async marcarCasillerosPorImagen(imagenId: number): Promise<void> {
    //await this.casilleroRepository.update({ imagenId }, { salio: true });
    const casilleros = await this.casilleroRepository.find({
      where: { imagenId, salio: false },
      relations: ['imagenId'],
    });
    console.log(casilleros)


    const filasActualizadas = new Set<number>(); // Para evitar sumar varias veces en la misma fila
    // 2. Actualizar los casilleros, marcándolos como 'salio = true' y actualizar filas y cartones
    const casillerosActualizados = await Promise.all(
      casilleros.map(async (casillero) => {
        casillero.salio = true;
        casillero.updatedAt = new Date;
        await this.casilleroRepository.save(casillero);        

    // 3. Actualizar la fila correspondiente sumando +1 en 'aciertos' si no se ha sumado aún
    
    const filas = await this.filaRepository
  .createQueryBuilder('fila')
  .innerJoin('fila.casillero', 'casillero') // Hacer join con la relación casilleros  
  .where('casillero.imagenId = :imagenId', { imagenId }) // Filtrar por imagenId
  .select('fila') // Selecciona las filas
  .getMany();
    console.log(filas)
    for (const fila of filas){
      if (fila && !filasActualizadas.has(fila.filaId)) {
        fila.aciertos += 1;
        let carton = fila.carton
        console.log(`aca deberia estar el carton: ${carton}`)
        await this.filaRepository.save(fila);
        filasActualizadas.add(fila.filaId); // Evitar sumar dos veces en la misma fila        
      }
    }

  
        return casillero;
      }),
    );
  }

  async updateCartonAciertos(cartonId: number): Promise<void> {
    // Realizar la suma directamente en la base de datos
    const totalAciertosResult = await this.filaRepository
      .createQueryBuilder('fila')
      .where('fila.cartonId = :cartonId', { cartonId })
      .select('SUM(fila.aciertos)', 'total')
      .getRawOne();
  
    // Verificar si el totalAciertosResult tiene el campo 'total'
    const totalAciertos = totalAciertosResult?.total || 0;
  
    // Asegurarse de que el cartonId y totalAciertos sean válidos
    if (cartonId && totalAciertos !== undefined) {
      // Actualizar el cartón con el total de aciertos
      await this.cartonRepository.update(cartonId, { aciertos: totalAciertos });
    } else {
      throw new Error(`Error al calcular el total de aciertos valor ${totalAciertos} o el cartonId valor ${cartonId}`);
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

  async findImagenesSalieron(): Promise<Casillero[]> {
    try {
      return await this.casilleroRepository
      .createQueryBuilder('casillero')
      .leftJoinAndSelect('casillero.imagenId', 'imagen') // Incluye la relación con Imagen
      .select([
        'casillero.imagenId', // Selecciona la imagenId
        'imagen.url',       // Selecciona el nombre de la imagen (u otro campo relevante)        
        'MAX(casillero.updatedAt) as lastUpdatedAt' // Selecciona la última fecha de actualización
      ])
      .where('casillero.updatedAt IS NOT NULL')
      .groupBy('casillero.imagenId')
      .orderBy('MAX(casillero.updatedAt)', 'DESC')
      .getRawMany();
    } 
    catch (error) {
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
