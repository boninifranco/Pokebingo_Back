import { IsDate, IsInt, IsTimeZone } from "class-validator";

export class CreateTorneoDto {
    @IsInt()
    torneoId: number;
    
    @IsInt()
    nroTorneo: number;

    @IsDate()
    fecha: Date;

    @IsTimeZone()
    horaInicio: number;

    @IsTimeZone()
    horaCierre: number;
}
