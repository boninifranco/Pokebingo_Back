import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { CreateCartonDto } from './create-carton.dto';

export class UpdateCartonDto extends PartialType(CreateCartonDto) {
  @IsInt()
  @IsOptional()
  aciertos?: number;
}
