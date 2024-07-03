import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';
import { MetodosPago } from './entities/metodospago.entity';
import { setId } from 'src/funciones/funciones';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

const baseUrl = 'http://localhost:3030/metodospago'

@Injectable()
export class MetodosPagoService {
  constructor(@InjectRepository(MetodosPago)
  private readonly metodosPagoRepository : Repository<MetodosPago>){};

  async create(createMetodosPagoDto: CreateMetodosPagoDto): Promise<MetodosPago> {
    try {
      const metodosPago : MetodosPago = this.metodosPagoRepository.create(createMetodosPagoDto);
      return this.metodosPagoRepository.save(metodosPago); 
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async findAll(): Promise<MetodosPago[]> {
    try {
      const metodosPago = await this.metodosPagoRepository.find();
      if(metodosPago.length===0) throw new BadRequestException(`No se encuentran métodos de pago en la base de datos`);
      return metodosPago;
      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async findOne(id: number): Promise<MetodosPago> {
    try {
      const criterio: FindOneOptions = {where:{id:id}};
      const metodoPago = await this.metodosPagoRepository.findOne(criterio);
      if(!metodoPago) throw new BadRequestException(`No se encontro el método de pago con id ${id}`)
      return metodoPago;      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }    
  }

  async update(id: number, updateMetodosPagoDto: UpdateMetodosPagoDto): Promise<MetodosPago> {
    try {
      const criterio: FindOneOptions = {where:{id:id}};
      let metodoPago = await this.metodosPagoRepository.findOne(criterio);
      if(!metodoPago) throw new BadRequestException(`No se encontro el método de pago con id ${id}`)
      metodoPago.descripcion = (updateMetodosPagoDto.descripcion);
      await this.metodosPagoRepository.update(id,metodoPago);
    return metodoPago;      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }

  async remove(id: number){
    try {
      const criterio: FindOneOptions = {where:{id:id}};
      const metodoPago = await this.metodosPagoRepository.findOne(criterio);
      if(!metodoPago) throw new BadRequestException(`No se encontro el método de pago con id ${id}`)
      await this.metodosPagoRepository.delete(metodoPago);
      return `Se ha eliminado el metodo de pago con id ${id}`
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)      
    }
  }
}
