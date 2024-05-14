import { IsBoolean, IsInt, IsOptional, IsString} from 'class-validator';

export class CreateUsuarioDto{
    @IsString()
    apellido:string;

    @IsString()
    nombre:string;

    @IsString()
    celular:string;

    @IsOptional()
    @IsString()
    direccion?:string;

    @IsString()
    usuario:string;

    @IsString()
    contrasena:string;

    @IsBoolean()
    administrador:boolean;

    @IsBoolean()
    logueado:boolean;  
}
