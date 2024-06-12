import { IsBoolean, IsInt, IsTimeZone } from "class-validator";

export class CreatePartidaDto {
    @IsInt()
    partidaId: number;

    @IsInt()
    nroPartida: number;

    @IsTimeZone()
    horaInicio: number;

    @IsInt()
    cantidadCartones: number;

    @IsBoolean()
    estadoPartida: boolean;

    @IsInt()
    idTorneo: number;
}
