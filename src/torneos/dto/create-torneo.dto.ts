import { IsDate, IsDateString, IsInt, IsTimeZone } from "class-validator";

export class CreateTorneoDto {
  
    @IsInt()
    nroTorneo: number;

    @IsDate()
    fecha: Date;

    @IsDateString()
    horaInicio: Date;

    @IsDateString()
    horaCierre: Date;
}
