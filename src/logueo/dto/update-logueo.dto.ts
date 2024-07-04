import { PartialType } from '@nestjs/mapped-types';
import { CreateLogueoDto } from './create-logueo.dto';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateLogueoDto extends PartialType(CreateLogueoDto) {
    @IsBoolean()
    logueado:boolean;

    //@IsDate()
    //@IsOptional()
    //logout?: Date | null;
}
