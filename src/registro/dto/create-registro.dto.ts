import { IsBoolean, IsInt, IsOptional, IsString, Min, isBoolean, isInt } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Registro } from "../entities/registro.entity";

export class CreateRegistroDto {

    @IsInt()    
    usuarioId: number;

    @IsString()
    email: string;

    @IsString()
    contrasenia:string;
    
    @IsBoolean()
    administrador:boolean;
    
}
