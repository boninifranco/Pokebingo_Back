import {  Injectable,  BadRequestException,  HttpException,  HttpStatus, UnauthorizedException,} from '@nestjs/common';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';
import { Logueo } from './entities/logueo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions} from 'typeorm';
import { RegistroService } from '../registro/registro.service';
import { error } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LogueoService {
  constructor(
    @InjectRepository(Logueo)
    private readonly logueoRepository: Repository<Logueo>,
    private readonly registroService: RegistroService,
    private jwtService: JwtService,
    private readonly createLogueoDto: CreateLogueoDto,
    
  ) {}

  async create(createLogueoDto: CreateLogueoDto): Promise<Logueo> {
    //const isRegistro = await this.registroService.findOneId(
      //Number(createLogueoDto.idUsuario),
    //);
    //if (!isRegistro)
      //throw new error(
        //`No existe registro del usuario con id ${createLogueoDto.idUsuario}`,
      //);
    //const usuarioLogueado = await this.findLogueoTrue(
      //createLogueoDto.idUsuario,
    //);
    //if (usuarioLogueado)
      //throw new BadRequestException(
        //`El usuario con Id ${createLogueoDto.idUsuario} ya se encuentra logueado`,
      //);
    try {
      
     
        let { logout ,idUsuario } = createLogueoDto;
        let login = new Date();
        logout = '';
        const logueoDto = { login, idUsuario, logout };
        const nuevoLogueo: Logueo = this.logueoRepository.create(logueoDto);
        return this.logueoRepository.save(nuevoLogueo);
      
      
      
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Logueo[]> {
    try {
      const logueos = await this.logueoRepository.find();
      if (logueos.length === 0) {
        throw new BadRequestException(`No existen logueos en la base de datos`);
      }
      return logueos;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<Logueo> {
    try {
      const criterio :FindOneOptions = {relations: ['carton' ], where:{id:id}}
      const logueo = await this.logueoRepository.findOne(criterio);
      if (!logueo)
        throw new BadRequestException(
          `No existe logueo con id ${id} en la base de datos`,
        );
      return logueo;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateLogueoDto: UpdateLogueoDto): Promise<Logueo> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let logueo = await this.logueoRepository.findOne(criterio);
      if (!logueo)
        throw new BadRequestException(`No se encuentra el logueo con id ${id}`);
      logueo.idUsuario = updateLogueoDto.idUsuario;
      logueo.idPartida = updateLogueoDto.idPartida;
      logueo.logout = updateLogueoDto.logout;
      logueo.logueado = updateLogueoDto.logueado;
      await this.logueoRepository.update(id, logueo);
      return logueo;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let logueo = await this.logueoRepository.findOne(criterio);
      if (!logueo)
        throw new BadRequestException(`No se encuentra el logueo con id ${id}`);
      await this.logueoRepository.delete(id);
      return `Se ha eliminado el logueo con id ${id}`;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findLogueoTrue(idUsuario: number): Promise<Logueo> {
    const usuarioIdLogueado = await this.logueoRepository
      .createQueryBuilder('logueo')
      .where('logueo.idUsuario = :idUsuario', { idUsuario })
      .andWhere('logueo.logueado = :logueado', { logueado: true })
      .getOne();
    return usuarioIdLogueado;
  }
  async login(mail: string, pass: string): Promise<any> {
    const user = await this.registroService.findUserEmail1(mail);//,pass
    const msj = user.administrador ? `administrador` : `usuario`;
    const isMatch = await bcrypt.compare(pass, user?.contrasenia);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const idUsuario = user.id
    console.log(idUsuario);
    const usuarioLogueado = await this.findLogueoTrue(
      idUsuario
    );
    if (usuarioLogueado)
      throw new BadRequestException(
        `El usuario con Id ${idUsuario} ya se encuentra logueado`,
      );
      try {
      
     
        //let { logout ,idUsuario } = this.createLogueoDto;
        let login = new Date();
        const logout = '';
        const logueoDto = { login, idUsuario, logout };
        const nuevoLogueo: Logueo = this.logueoRepository.create(logueoDto);
        
        return this.logueoRepository.save(nuevoLogueo);        
      
      
      
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }      

    return {
      logueado_como: msj,
      access_token: await this.jwtService.signAsync(payload),
      id: user.id
    };    
    
  }
}
