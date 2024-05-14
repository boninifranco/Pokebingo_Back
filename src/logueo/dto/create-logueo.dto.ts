import { IsBoolean, IsInt, Min } from "class-validator";

export class CreateLogueoDto {

    @IsInt()
    @Min(1)    
    idUsuario:number;

    @IsBoolean()
    logueado:boolean;
}
