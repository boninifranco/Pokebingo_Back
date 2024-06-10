import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateLogueoDto {

    //@IsInt()
    //@Min(1)    
    idUsuario:Usuario;

    @IsBoolean()
    logueado:boolean;

    @IsString()
    @IsOptional()
    login: string;

    @IsString()
    @IsOptional()
    logout: string;
}
