import { IsInt, IsString } from 'class-validator';

export class CreatePuntajesDto {

    @IsString()
    descripcion: string;

    @IsInt()
    puntos: number;
}
