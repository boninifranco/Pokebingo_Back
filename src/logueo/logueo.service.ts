import {  Injectable,  BadRequestException,  HttpException,  HttpStatus,} from '@nestjs/common';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';
import { Logueo } from './entities/logueo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { RegistroService } from '../registro/registro.service';
import { error } from 'console';

@Injectable()
export class LogueoService {
  constructor(
    @InjectRepository(Logueo)
    private readonly logueoRepository: Repository<Logueo>,
    private readonly registroService: RegistroService,
  ) {}

  async create(createLogueoDto: CreateLogueoDto): Promise<Logueo> {
    const isRegistro = await this.registroService.findOneId(
      Number(createLogueoDto.idUsuario),
    );
    if (!isRegistro)
      throw new error(
        `No existe registro del usuario con id ${createLogueoDto.idUsuario}`,
      );
    const usuarioLogueado = await this.findLogueoTrue(
      createLogueoDto.idUsuario,
    );
    if (usuarioLogueado)
      throw new BadRequestException(
        `El usuario con Id ${createLogueoDto.idUsuario} ya se encuentra logueado`,
      );
    try {
      let { logout, idUsuario } = createLogueoDto;
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
      const criterio: FindOneOptions = { where: { id: id } };
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
}
