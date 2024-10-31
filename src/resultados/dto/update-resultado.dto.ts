import { PartialType } from '@nestjs/mapped-types';
import { CreateResultadoDto } from './create-resultado.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateResultadoDto extends PartialType(CreateResultadoDto) {
    @IsString()
    resultado: string;

    @IsInt()
    partidaId: number;

    @IsInt()
    usuarioId: number;
}
