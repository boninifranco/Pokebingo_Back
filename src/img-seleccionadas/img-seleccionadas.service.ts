import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImgSeleccionadaDto } from './dto/create-img-seleccionada.dto';
import { UpdateImgSeleccionadaDto } from './dto/update-img-seleccionada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImgSeleccionada } from './entities/img-seleccionada.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';

@Injectable()
export class ImgSeleccionadasService {
  constructor(
    @InjectRepository(ImgSeleccionada)
    private readonly imgSeleccionadaRepository: Repository<ImgSeleccionada>,
    @InjectRepository(Partida)
    private partidaRepository: Repository<Partida>,

    @InjectRepository(Imagen)
    private imagenRepository: Repository<Imagen>,
  ){

  }
  async create(createImgSeleccionadaDto: CreateImgSeleccionadaDto):Promise<ImgSeleccionada> {
    const { partidaId, imagenId } = createImgSeleccionadaDto;
    const partida = await this.partidaRepository.findOne({ where: { partidaId: partidaId } });
    if (!partida) {
      throw new Error(`La partida con id ${partidaId} no existe`);
    }
    const imagen = await this.imagenRepository.findOne({ where: { imagenId: imagenId } });
    if (!imagen) {
      throw new Error(`La imagen con id ${imagenId} no existe`);
    }
    try {
      const imgSeleccionada = this.imgSeleccionadaRepository.create({
        partida,
        imagen,
      });
      return await this.imgSeleccionadaRepository.save(imgSeleccionada);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un error: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
      
    }
    return ;
  }

  async findAll(): Promise<ImgSeleccionada[]> {
    return await this.imgSeleccionadaRepository.find();
  }

  async findOne(id: number) {
    
    const imagen = await this.imagenRepository.findOne({ where: { imagenId: id } })
    return imagen;
  }

  async findByPartidaId(partidaId: number): Promise<ImgSeleccionada[]> {
    // Verificamos que la partida exista
    const partida = await this.partidaRepository.findOne({ where: { partidaId: partidaId } });
    if (!partida) {
      throw new Error(`La partida con id ${partidaId} no existe`);
    }

    // Buscamos las imágenes seleccionadas por partidaId
    return this.imgSeleccionadaRepository
      .createQueryBuilder('imgSeleccionada')
      .leftJoinAndSelect('imgSeleccionada.imagen', 'imagen')
      .leftJoinAndSelect('imgSeleccionada.partida', 'partida')
      .where('imgSeleccionada.partidaId = :partidaId', { partidaId })
      .getMany();
  }
  async remove(id: number) {
    try {
      let criterio: FindOneOptions = { where: { idSeleccionada: id } };
      let imagen = await this.imgSeleccionadaRepository.findOne(criterio);
      if (!imagen) throw new Error('No se encuentra la imagen');
      console.log(imagen)
      await this.imgSeleccionadaRepository.delete(id);
      return `Se ha eliminado la imagen: ${id}`;
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


  /*update(id: number, updateImgSeleccionadaDto: UpdateImgSeleccionadaDto) {
    return `This action updates a #${id} imgSeleccionada`;
  }*/

  


