import { IsInt, IsOptional, IsString, Min, isInt } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Registro } from "../entities/registro.entity";

export class CreateRegistroDto {

    
    //@IsOptional()
    //@IsInt()
    //id:number;

    @IsInt()    
    usuarioId: number;

    @IsString()
    email: string;

    @IsString()
    contrasena:string;   
    
}
