import { IsInt, IsString } from "class-validator";
import { Puntajes } from "src/puntajes/entities/puntajes.entity";

export class CreateResultadoDto {
    @IsInt()
    idPuntaje: number;

    @IsInt()
    partidaId: number;

    @IsInt()
    usuarioId: number;
}
