import { IsInt, IsString, Min } from "class-validator";

export class CreateRegistroDto {

    //id: number;
    @IsInt()
    @Min(1)
    usuarioId: number;

    @IsString()
    email: string;

    @IsString()
    contrasena:string
    
}
