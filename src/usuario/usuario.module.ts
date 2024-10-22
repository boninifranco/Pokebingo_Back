import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logueo } from 'src/logueo/entities/logueo.entity';
import { Resultado } from 'src/resultados/entities/resultado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Resultado])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
