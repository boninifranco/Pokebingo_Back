import { IsDateString, IsISO8601, IsInt, IsTimeZone, Matches } from "class-validator";

export class CreateTorneoDto {
  
    @IsInt()
    nroTorneo: number;

    @IsISO8601()
    fecha: string;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'La hora de inicio debe estar en el formato HH:MM:SS',
      })
      horaInicio: string;
    

    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: 'La hora de cierre debe estar en el formato HH:MM:SS',
    })
    horaCierre: string;
}
