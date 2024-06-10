import { Module } from '@nestjs/common';
import { DesempenoService } from './desempeno.service';
import { DesempenoController } from './desempeno.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desempeno } from './entities/desempeno.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Desempeno
    ])
  ],  
  controllers: [DesempenoController],
  providers: [DesempenoService],
  
})
export class DesempenoModule {}
