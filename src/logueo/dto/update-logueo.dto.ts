import { PartialType } from '@nestjs/mapped-types';
import { CreateLogueoDto } from './create-logueo.dto';
import {  IsBoolean, IsInt, IsOptional} from 'class-validator';

export class UpdateLogueoDto extends PartialType(CreateLogueoDto) {
  @IsBoolean()
  @IsOptional()
  logueado: boolean;

  @IsInt()
  @IsOptional()
  idPartida?: number;
}
