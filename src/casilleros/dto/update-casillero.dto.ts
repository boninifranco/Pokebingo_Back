import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateCasilleroDto } from 'src/casilleros/dto/create-casillero.dto';

export class UpdateCasilleroDto extends PartialType(CreateCasilleroDto) {
  @IsBoolean()
  salio: boolean;
}
