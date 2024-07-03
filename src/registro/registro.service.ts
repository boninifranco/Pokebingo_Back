import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { FindOneOptions, FindOptions, FindOptionsWhere, Repository, getRepository } from 'typeorm';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { error } from 'console';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { DuplicateEntryException } from 'src/exceptions/duplicate-entry.exception';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class RegistroService {
  constructor(@InjectRepository(Registro)    
    private readonly registroRepository: Repository<Registro>,
    private readonly usuarioService: UsuarioService
    
  ){}
  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
      const isUsuario = await this.usuarioService.findOne(createRegistroDto.usuarioId);

      if(!isUsuario) throw new error(`No existe el usuario con id ${createRegistroDto.usuarioId}`);

      const isRegistro = await this.findRegistroId(createRegistroDto.usuarioId)

      //const isRegistro = await this.findByUsuario(createRegistroDto.usuarioId.id);

      //console.log(isRegistro)      
     
      if(isRegistro) throw new BadRequestException(`Ya existe un registro para el usuario con id ${createRegistroDto.usuarioId}`);
            
    try {    
        const nuevoRegistro: Registro = this.registroRepository.create(createRegistroDto);
        return this.registroRepository.save(nuevoRegistro);            
    } catch (error) {
            /*console.error('Error:', error);  // Usar console.error para loggear el error
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            if (error.code === 'ER_DUP_ENTRY' || (error instanceof QueryFailedError && error.message.includes('Duplicate entry'))) {
              throw new DuplicateEntryException('Ya existe un registro para este usuario');
          }*/
    }
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);            
     
  }

  async findAll(): Promise<Registro[]> {
    try {
      const registros = await this.registroRepository.find();
      if(registros.length===0) throw new BadRequestException(`No se encontraron registros en la base de datos`);
      return registros;
    } catch (error) {      
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND)
      }      
    };
      

  async findOneId(id: number): Promise<Registro> {
    try {
      const criterio: FindOneOptions = {where:{id : id}}
      const registro = await this.registroRepository.findOne(criterio);
      if(!registro) throw new BadRequestException(`No existe el registro con id ${id}`)
      return registro;
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`},HttpStatus.NOT_FOUND);     
    }
  }
  async findRegistroId(usuarioId:number):Promise<Registro>{

    const registroUsuarioId =  await this.registroRepository.createQueryBuilder('registro')
    .where('registro.usuarioId = :usuarioId',{usuarioId})
    //.andWhere('logueo.logueado = :logueado', {logueado:true})
    .getOne()

    return registroUsuarioId;
  }
  
  /*async findByUsuario(usuarioId:number){
    try {
      const criterio: FindOneOptions = {where:{usuarioId : usuarioId}}
      const isRegistro = await this.registroRepository.findOne({ where: { usuarioId: { id: usuarioId }}});
      //if(!isRegistro) throw new BadRequestException(`No existe el registro con usuarioId ${usuarioId}`)
      return isRegistro;
      } catch (error) {
        throw new HttpException({status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`},HttpStatus.NOT_FOUND);     
      }
  }*/
  

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
        error: `Se produjo un error al enviar la petición ${error}`},HttpStatus.NOT_FOUND);      
    }    
  }

  async remove(id: number) {
    try {
      const criterio : FindOneOptions = {where: {id : id}};
      let registro = await this.registroRepository.findOne(criterio);
      if(!registro) throw new BadRequestException(`No existe el registro con id ${id}`);
      await this.registroRepository.delete(registro)
      return `Se ha eliminado el registro con id ${id}`; 
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`},HttpStatus.NOT_FOUND);      
    } 
  }
}

