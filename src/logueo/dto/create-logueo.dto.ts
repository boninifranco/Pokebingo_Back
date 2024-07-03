import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Registro } from "src/registro/entities/registro.entity";

export class CreateLogueoDto {

    @IsInt()       
    idUsuario:number;

    @IsBoolean()
    logueado:boolean;

    @IsString()
    @IsOptional()
    login: string;

    @IsString()
    @IsOptional()
    logout: string;
}
