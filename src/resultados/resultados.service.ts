import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateResultadoDto } from './dto/create-resultado.dto';
import { UpdateResultadoDto } from './dto/update-resultado.dto';
import { Resultado } from './entities/resultado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado) private readonly resultadoRepository: Repository<Resultado>,
  ){}
  create(createResultadoDto: CreateResultadoDto): Promise<Resultado> {
    try{
      const resultado = this.resultadoRepository.create(createResultadoDto);
      return this.resultadoRepository.save(resultado);
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
      //acá va el criterio de relación.
      let resultados: Resultado[] = await this.resultadoRepository.find();
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

  findOne(id: number) {
    return `This action returns a #${id} resultado`;
  }

  update(id: number, updateResultadoDto: UpdateResultadoDto) {
    return `This action updates a #${id} resultado`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultado`;
  }
}
