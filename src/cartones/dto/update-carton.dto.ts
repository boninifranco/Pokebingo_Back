import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateCartonDto } from './create-carton.dto';

export class UpdateCartonDto extends PartialType(CreateCartonDto) {
  @IsInt()
  aciertos: number;
}
