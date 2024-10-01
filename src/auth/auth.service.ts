import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistroService } from 'src/registro/registro.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LogueoService } from 'src/logueo/logueo.service';
import { CreateLogueoDto } from 'src/logueo/dto/create-logueo.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logueo } from 'src/logueo/entities/logueo.entity';

@Injectable()
export class AuthService {
  constructor(    
    private registroService: RegistroService,
    private jwtService: JwtService,
    
  ) {}

  async login(mail: string, pass: string): Promise<any> {
    const user = await this.registroService.findUserEmail(mail);//,pass
    const msj = user.administrador ? `administrador` : `usuario`;
    const isMatch = await bcrypt.compare(pass, user?.contrasenia);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const idUsuario = user.id      

    return {
      logueado_como: msj,
      access_token: await this.jwtService.signAsync(payload),
      id: user.id
    };
    
    ;
  }
}
