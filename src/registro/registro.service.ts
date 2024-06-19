import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';

@Injectable()
export class RegistroService {
  constructor(@InjectRepository(Registro)    
    private readonly registroRepository: Repository<Registro>,
    
  ){}
  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
    try {      
        const nuevoRegistro: Registro = this.registroRepository.create(createRegistroDto);
        return this.registroRepository.save(nuevoRegistro);            
    } catch (error) {
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : 'Se produjo un error al enviar la petición '+ error}, HttpStatus.NOT_FOUND);            
    } 
  }

  async findAll(): Promise<Registro[]> {
    try {
      const registros = await this.registroRepository.find();
      if(!registros) throw new BadRequestException(`No se encontraron registros`);
      return registros;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error}, HttpStatus.NOT_FOUND)
      }      
    }
    
  

  async findOne(id: number): Promise<Registro> {
    try {
      const criterio: FindOneOptions = {where:{id : id}}
      const registro = await this.registroRepository.findOne(criterio);
      if(!registro) throw new BadRequestException(`No existe el registro con id ${id}`)
      return registro;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+error},HttpStatus.NOT_FOUND);     
    }
  }

  async update(id: number, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    try {
      const criterio : FindOneOptions = {where: {id : id}};
      let registro = await this.registroRepository.findOne(criterio);
      if(!registro) throw new BadRequestException(`No existe el registro con id ${id}`);
      registro.email = (updateRegistroDto.email);
      registro.contrasena = (updateRegistroDto.contrasena);
      await this.registroRepository.update(id,registro);
      return registro;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error},HttpStatus.NOT_FOUND);      
    }    
  }

  async remove(id: number):Promise<Registro> {
    try {
      const criterio : FindOneOptions = {where: {id : id}};
      let registro = await this.registroRepository.findOne(criterio);
      if(!registro) throw new BadRequestException(`No existe el registro con id ${id}`);
      await this.registroRepository.delete(registro)
      return registro; 
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al enviar la petición'+ error},HttpStatus.NOT_FOUND);      
    } 
  }
}
