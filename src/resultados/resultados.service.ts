import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Resultado } from './entities/resultado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado) private resultadoRepository: Repository<Resultado>,
    @InjectRepository(Partida) private partidaRepository: Repository<Partida>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}
  async create(createResultadoDto: CreateResultadoDto): Promise<Resultado> {
    try{
      const partida = await this.partidaRepository.findOne({where: {partidaId: createResultadoDto.partidaId},});
      if (!partida){
        throw new Error('Partida no encontrada');
      }
      const usuario = await this.usuarioRepository.findOne({where: {id: createResultadoDto.usuarioId},});
      if (!usuario){
        throw new Error('Usuario no encontrada');
      }
      const resultado = this.resultadoRepository.create({
        resultado: createResultadoDto.resultado,
        partida: partida,
        usuario: usuario,
      });
      const nuevoResultado = await this.resultadoRepository.save(resultado);
      if (nuevoResultado) return nuevoResultado;
      else throw new Error('No se pudo crear el Resultado');
    } catch (error){
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Resultado[]> {
    try {
      let criterio: FindManyOptions = {relations: ['partidas','usuarios']}
      let resultados: Resultado[] = await this.resultadoRepository.find(criterio);
      if (resultados) return resultados;
      else throw new Error('No se encontraron resultados');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un erorr: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

   async findOne(id: number) {
    try {
      let criterio: FindOneOptions = { relations: { partidaId: id, usuarioId: id } };
      let casillero: Resultado =
        await this.resultadoRepository.findOne(criterio);
      if (casillero) return casillero;
      else throw new Error(`No se encontró el resultado: ${id}`);
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

  update(id: number, updateResultadoDto: UpdateResultadoDto) {
    return `This action updates a #${id} resultado`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultado`;
  }
}
