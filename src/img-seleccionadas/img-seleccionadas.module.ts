import { Module } from '@nestjs/common';
import { ImgSeleccionadasService } from './img-seleccionadas.service';
import { ImgSeleccionadasController } from './img-seleccionadas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgSeleccionada } from './entities/img-seleccionada.entity';
import { Partida } from 'src/partidas/entities/partida.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImgSeleccionada, Partida, Imagen])],
  controllers: [ImgSeleccionadasController],
  providers: [ImgSeleccionadasService],
})
export class ImgSeleccionadasModule {}
