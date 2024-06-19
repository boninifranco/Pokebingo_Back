import { Module } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './entities/registro.entity';
import { Logueo } from 'src/logueo/entities/logueo.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Registro,Logueo
    ]),
    UsuarioModule
  ],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule {}
