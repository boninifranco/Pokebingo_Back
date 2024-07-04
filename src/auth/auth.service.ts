import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistroService } from 'src/registro/registro.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private registroService: RegistroService,
        private jwtService: JwtService){}

    async login(email: string, pass: string): Promise<any>{
        const user = await this.registroService.findUserEmail(email);
        const msj = user.administrador? `administrador`:`usuario`
        const isMatch = await bcrypt.compare(pass, user?.contrasenia);
        if (!isMatch){            
            throw new UnauthorizedException();
        }        
        const payload = {sub: user.id, email: user.email};        
        return{
            logueado_como: msj,
            access_token: await this.jwtService.signAsync(payload),             
        };
    }
}
