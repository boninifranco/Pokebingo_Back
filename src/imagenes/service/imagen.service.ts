import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateImagenDto } from '../dto/create-imagen.dto';
import { Imagen } from '../entities/imagen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateImagenDto } from '../dto/update-imagen.dto';
import { Casillero } from 'src/casilleros/entities/casillero.entity';
import { ImgPremios } from '../entities/imgPremios.entity';
import { CreateImgPremiosDto } from '../dto/create-imgPremios.dto';

@Injectable()
export class ImagenService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
    @InjectRepository(ImgPremios)
    private readonly imgPremiosRepository: Repository<ImgPremios>,
    @InjectRepository(Casillero)
    private readonly casilleroRepository: Repository<Casillero>,
  ) {}

  async findAll(): Promise<Imagen[]> {
    try {
      let imagenes: Imagen[] = await this.imagenRepository.find();
      if (imagenes.length != 0) return imagenes;
      else throw new Error('No se encontrararon imagenes');
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
  async findAllImgPremios(): Promise<ImgPremios[]> {
    try {
      let imagenesPremios: ImgPremios[] = await this.imgPremiosRepository.find();
      if (imagenesPremios.length != 0) return imagenesPremios;
      else throw new Error('No se encontrararon imagenes');
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

  async findOne(id: string): Promise<Imagen> {
    try {
      let criterio: FindOneOptions = { where: { imagenId: id } };
      let imagen: Imagen = await this.imagenRepository.findOne(criterio);
      if (imagen) return imagen;
      else throw new Error(`No se encontró la imagen: ${id}`);
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

  async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
    try {      
        const imagen = this.imagenRepository.create({        
          nombre: createImagenDto.nombre,
          id: createImagenDto.id,
          url: createImagenDto.url,
         });
        const newImagen =  await this.imagenRepository.save(imagen);
        if (newImagen) return newImagen;
        else throw new Error('No se pudo crear la imagen');     
      
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un errorrrr: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createImgPremios(createImgPremiosDto: CreateImgPremiosDto): Promise<ImgPremios> {
    try {      
        const imgPremios = this.imgPremiosRepository.create({        
          secureUrl: createImgPremiosDto.secureUrl,
          
         });
        const newImagenPremios =  await this.imgPremiosRepository.save(imgPremios);
        if (newImagenPremios) return newImagenPremios;
        else throw new Error('No se pudo crear la imagen de premios');     
      
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Se produjo un errorrrr: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateImagenDto: UpdateImagenDto): Promise<Imagen> {
    try {
      let criterio: FindOneOptions = { where: { imagenId: id } };
      let imagen: Imagen = await this.imagenRepository.findOne(criterio);
      if (!imagen) throw new Error('No se encuentra la imagen');
      else 
      imagen.setNombre(updateImagenDto.nombre);
      imagen.setId(updateImagenDto.id);
      imagen.setUrl(updateImagenDto.url);
      imagen = await this.imagenRepository.save(imagen);
      return imagen;
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

  async remove(id: string) {
    try {
      let criterio: FindOneOptions = { where: { imagenId: id } };
      let imagen: Imagen = await this.imagenRepository.findOne(criterio);
      if (!imagen) throw new Error('No se encuentra la imagen');
      else await this.imagenRepository.delete(id);
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
