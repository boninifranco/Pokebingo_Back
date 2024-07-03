import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateImagenDto } from '../dto/create-imagen.dto'; 
import { Imagen } from '../entities/imagen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateImagenDto } from '../dto/update-imagen.dto';

@Injectable()
export class ImagenService {

  constructor(@InjectRepository(Imagen) private readonly imagenRepository : Repository<Imagen>){}

  async findAll(): Promise<Imagen[]> {
    try{
      let imagenes: Imagen[] = await this.imagenRepository.find();
      if(imagenes.length != 0) return imagenes;
      else throw new Error('No se encontrararon imagenes');
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Imagen> {
    try{
      let criterio : FindOneOptions = {where: {imagenId: id }};
      let imagen : Imagen = await this.imagenRepository.findOne(criterio);
      if (imagen) return imagen;
      else throw new Error(`No se encontró la imagen: ${id}`);
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
    try{
      let imagen: Imagen = await this.imagenRepository.save(new Imagen(createImagenDto.imagen));
      if (imagen) return imagen;
      else throw new Error('No se pudo crear la imagen');
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateImagenDto: UpdateImagenDto): Promise<Imagen> {
    try {
      let criterio : FindOneOptions = {where: {imagenId: id}};
      let imagen : Imagen = await this.imagenRepository.findOne(criterio);
      if (!imagen) throw new Error('No se encuentra la imagen');
      else
        imagen.setImagen(updateImagenDto.imagen);     
        imagen = await this.imagenRepository.save(imagen);
        return imagen;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      let criterio : FindOneOptions = {where: {imagenId: id}};
      let imagen : Imagen = await this.imagenRepository.findOne(criterio);
      if (!imagen) throw new Error('No se encuentra la imagen');
      else
        await this.imagenRepository.delete(id);
        return true;
    } catch (error){
      throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'Se produjo un error: '+error}, HttpStatus.NOT_FOUND);
    }
  }
}
