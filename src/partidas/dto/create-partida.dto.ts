import { IsBoolean, IsInt, IsString, IsTimeZone } from "class-validator";

export class CreatePartidaDto {
    
    @IsInt()
    nroPartida: number;

    @IsString()
    horaInicio: string;

    @IsInt()
    cantidadCartones: number;

    @IsBoolean()
    estadoPartida: boolean;

}
