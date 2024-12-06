import { PartialType } from '@nestjs/mapped-types';
import { CreateResultadoDto } from './create-resultado.dto';
import { IsInt, IsString } from 'class-validator';
import { Puntajes } from 'src/puntajes/entities/puntajes.entity';

export class UpdateResultadoDto extends PartialType(CreateResultadoDto) {
    @IsInt()
    idPuntaje: number;

    @IsInt()
    partidaId: number;

    @IsInt()
    usuarioId: number;
}
