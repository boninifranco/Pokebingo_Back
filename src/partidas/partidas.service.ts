import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Sala } from 'src/sala/entities/sala.entity';
import { parse } from 'date-fns';

@Injectable()
export class PartidasService {
  constructor(
    @InjectRepository(Partida)
    private readonly partidaRepository: Repository<Partida>,
    @InjectRepository(Sala) private readonly salaRepository: Repository<Sala>,
  ) {}
  async create(createPartidaDto: CreatePartidaDto): Promise<any> {
    try {
      const sala = await this.salaRepository.findOne({
        where: { salaId: createPartidaDto.salaId },
      });
      if (!sala) {
        throw new Error('Sala no encontrada');
      }
      
      const fechaString = createPartidaDto.horaInicio;
      console.log(fechaString)
      const fecha = parse(fechaString, 'dd/MM/yyyy HH:mm', new Date());
      //createPartidaDto.horaInicio = fecha
      console.log(fecha)
      const partida = this.partidaRepository.create(createPartidaDto)

      const nuevaPartida = await this.partidaRepository.save(partida);
      if (nuevaPartida) return nuevaPartida;
      else throw new Error('No se pudo crear la partida');
      
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
  public async partidasSinCartones(): Promise<Partida[]> {
    const partidasSinCartones = await this.partidaRepository
      .createQueryBuilder('partida')
      .leftJoin('partida.cartones', 'carton') 
      .where('carton.partida IS NULL') 
      .getMany();

    return partidasSinCartones;
  }

  async getPartidasConImagenes() {
    const partidas = await this.partidaRepository
      .createQueryBuilder('partida')
      .leftJoinAndSelect('partida.imgSeleccionadas', 'imgSeleccionadas')
      .select(['partida.partidaId AS partida_id'])
      .addSelect('COUNT(imgSeleccionadas.idSeleccionada) > 0', 'hasImages')
      .groupBy('partida.partidaId')
      .getRawMany();

     // Mapeamos los resultados para tener un array de objetos en el formato solicitado
     const resultado = partidas.map(row => ({
      partidaId: row.partida_id,
      hasImages: row.hasImages === '1', // Convertimos "1"/"0" a booleano
    }));

    return resultado;
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

  async findActivas(): Promise<Partida[]> {
    try {
      let criterio: FindManyOptions = { relations: ['cartones'],
        where: {['estadoPartida'] : false}
       };
      let partidas: Partida[] = await this.partidaRepository.find(criterio);
      if (partidas.length != 0) return partidas;
      else throw new Error('No se encontraron partidas activas');
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

  async findOne(id: Partida): Promise<Partida> {
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
  async findLastActive(): Promise<Partida> {
    try {
      const criterio: FindOneOptions<Partida> = {
        where: { estadoPartida: true },  // Filtro por estadoPartida en true
        order: { horaInicio: 'DESC' },   // Ordenar por horaInicio descendente
      };
  
      const partida = await this.partidaRepository.findOne(criterio);
      
      if (!partida) {
        throw new Error('No se encontró ninguna partida activa.');
      }
      
      return partida;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error.message,
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
      const fechaString = UpdatePartidaDto.horaInicio;
      const fecha = parse(fechaString, 'dd/MM/yyyy HH:mm', new Date());
      console.log(fecha)
      console.log(fechaString)
      
      if (!partida) throw new Error('No se encuentra la partida');
      else 
      partida.setHoraInicio(fechaString);
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
