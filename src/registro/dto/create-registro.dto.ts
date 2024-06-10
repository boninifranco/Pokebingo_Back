import { IsInt, IsString, Min } from "class-validator";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateRegistroDto {

    @IsInt()
    @Min(1)
    usuarioId: Usuario;

    @IsString()
    email: string;

    @IsString()
    contrasena:string    
}
