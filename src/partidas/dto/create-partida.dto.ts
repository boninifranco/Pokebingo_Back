import { IsBoolean, IsInt, IsTimeZone } from "class-validator";

export class CreatePartidaDto {
    @IsInt()
    partidaId: number;

    @IsInt()
    nroPartida: number;

    @IsTimeZone()
    horaInicio: string;

    @IsInt()
    cantidadCartones: number;

    @IsBoolean()
    estadoPartida: boolean;

    @IsInt()
    salaId: number;
}
