import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasilleroController } from 'src/casilleros/controllers/casillero.controllers';
import { CasilleroService } from 'src/casilleros/service/casillero.service';
import { Casillero } from './entities/casillero.entity';
import { Fila } from 'src/filas/entities/fila.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Casillero, Fila, Imagen
    ])
  ],
  controllers: [CasilleroController],
  providers: [CasilleroService],
})
export class CasilleroModule {}
