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

    @IsBoolean()
    administrador:boolean;     
}
