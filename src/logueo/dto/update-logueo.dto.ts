import { PartialType } from '@nestjs/mapped-types';
import { CreateLogueoDto } from './create-logueo.dto';
import {  IsBoolean, IsInt} from 'class-validator';

export class UpdateLogueoDto extends PartialType(CreateLogueoDto) {
  @IsBoolean()
  logueado: boolean;

  @IsInt()
  idPartida?: number;
}
