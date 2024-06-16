import { IsDate, IsInt, IsTimeZone } from "class-validator";

export class CreateTorneoDto {
    @IsInt()
    torneoId: number;
    
    @IsInt()
    nroTorneo: number;

    @IsDate()
    fecha: string;

    @IsTimeZone()
    horaInicio: string;

    @IsTimeZone()
    horaCierre: string;
}
