import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { error } from 'console';
import * as bcrypt from 'bcrypt';


@Injectable()
export class RegistroService {
  constructor(@InjectRepository(Registro)    
    private readonly registroRepository: Repository<Registro>,
    private readonly usuarioService: UsuarioService, 
    
  ){}
  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
      const isUsuario = await this.usuarioService.findOne(createRegistroDto.usuarioId);

      if(!isUsuario) throw new error(`No existe el usuario con id ${createRegistroDto.usuarioId}`);

      const isRegistro = await this.findRegistroId(createRegistroDto.usuarioId)
     
      if(isRegistro) throw new BadRequestException(`Ya existe un registro para el usuario con id ${createRegistroDto.usuarioId}`);
            
    try {
        let {contrasenia, email, administrador, usuarioId} = createRegistroDto;
        const hashPass = await this.hashPass(contrasenia)        
        contrasenia=hashPass
        createRegistroDto = {contrasenia,email,administrador,usuarioId}
        const nuevoRegistro: Registro = this.registroRepository.create(createRegistroDto);
        return this.registroRepository.save(nuevoRegistro);            
    } catch (error) {            
      throw new HttpException( { status : HttpStatus.NOT_FOUND,
        error : `Se produjo un error al enviar la petición ${error}`}, HttpStatus.NOT_FOUND);
  }
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
    .getOne()
    return registroUsuarioId;
  }
  
  async findUserEmail(email:string):Promise<Registro>{
    try {
    const isUser = await this.registroRepository.createQueryBuilder('registro')    
    .where('registro.email = :email',{email})
    .getOne()

    if(!isUser) throw new BadRequestException(`No existe un registro para el email ${email}`)    
    return isUser ;      
    } catch (error) {
      throw new HttpException({status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al enviar la petición ${error}`},HttpStatus.NOT_FOUND);      
    }    
  }  

  async update(id: number, updateRegistroDto: UpdateRegistroDto): Promise<Registro> {
    try {
      const criterio : FindOneOptions = {where: {id : id}};
      let registro = await this.registroRepository.findOne(criterio);
      if(!registro) throw new BadRequestException(`No existe el registro con id ${id}`);
      registro.email = (updateRegistroDto.email);
      registro.contrasenia = (updateRegistroDto.contrasenia);
      registro.administrador = (updateRegistroDto.administrador);
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

  private async hashPass (pass:string):Promise<string>{
    const saltOrRounds = 10;    
    const salt = await bcrypt.genSalt(saltOrRounds)
    const hashSalt = await bcrypt.hash(pass, salt);  
  return hashSalt
  }
}