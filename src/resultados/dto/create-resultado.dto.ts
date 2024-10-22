import { IsInt, IsString } from "class-validator";

export class CreateResultadoDto {
    @IsString()
    resultado: string;

    @IsInt()
    partidaId: number;

    @IsInt()
    usuarioId: number;
}
