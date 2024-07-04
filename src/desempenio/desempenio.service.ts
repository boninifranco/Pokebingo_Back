
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDesempenioDto } from './dto/create-desempenio.dto';
import { UpdateDesempenioDto } from './dto/update-desempenio.dto';
import { Desempenio } from './entities/desempenio.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroService } from 'src/registro/registro.service';
import { error } from 'console';

@Injectable()
export class DesempenioService {

  constructor(@InjectRepository(Desempenio)    
    private readonly desempenioRepository : Repository<Desempenio>,
    private readonly registroService : RegistroService
  ){}

  async create(createDesempenioDto: CreateDesempenioDto): Promise<Desempenio> {
    const isRegistro = await this.registroService.findOneId(createDesempenioDto.jugador);
    if(!isRegistro) throw new error(`No existe registro del usuario con id ${createDesempenioDto.jugador}`);
    const isDesempenio = await this.findDesempenioUsuario(createDesempenioDto.jugador)
    
    if(isDesempenio)throw new BadRequestException(`Ya existe desempeño para el jugador con id ${createDesempenioDto.jugador}`)
    try {
      const newDesempenio: Desempenio = this.desempenioRepository.create(createDesempenioDto)
      return this.desempenioRepository.save(newDesempenio);      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
    }
  };

  async findAll():Promise<Desempenio[]> {
    try {      
      const desempenio = await this.desempenioRepository.find()
      if(desempenio.length===0) throw new BadRequestException(`No se encuentran desempeños en la base de datos`)
      return desempenio;
      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
    }
  }


  async findOne(id: number):Promise<Desempenio> {
    try {
      const criterio : FindOneOptions = {where:{ id : id}};
      const desempenio = await this.desempenioRepository.findOne(criterio);
      if(!desempenio) throw new BadRequestException(`No existe el desempeño con id ${id}`);
      return desempenio;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }    
  }

  async update(id: number, updateDesempenioDto: UpdateDesempenioDto): Promise<Desempenio> {
    try {
      const criterio :FindOneOptions = {where:{id:id}};
      let desempenio = await this.desempenioRepository.findOne(criterio);
      if(!desempenio) throw new BadRequestException(`No se encuentra el desempenio con id ${id}`);
      desempenio.jugador = (updateDesempenioDto.jugador);
      desempenio.creditos = (updateDesempenioDto.creditos);
      desempenio.puntos = (updateDesempenioDto.puntos);
      desempenio.cartonesComprados = (updateDesempenioDto.cartonesComprados);
      await this.desempenioRepository.update(id,desempenio)
      return desempenio;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
    }    
  }

  async remove(id: number) {
    try {
      const criterio : FindOneOptions = {where:{id:id}};
      const desempenio = await this.desempenioRepository.findOne(criterio);
      if(!desempenio) throw new BadRequestException(`No se encuentra el desempenio con id ${id}`);
      await this.desempenioRepository.delete(desempenio);
      return `Se ha eliminado el desempeño con id ${id}`;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
    }    
  }

  async findDesempenioUsuario(jugadorId:number):Promise<Desempenio>{

    const desempenioUsuario =  await this.desempenioRepository.createQueryBuilder('desempenio')
    .where('desempenio.jugadorId = :jugadorId',{jugadorId})    
    .getOne()

    return desempenioUsuario;
  }
}