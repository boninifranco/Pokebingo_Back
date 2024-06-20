import { PartialType } from '@nestjs/mapped-types';
import { CreateCasilleroDto } from 'src/casilleros/dto/create-casillero.dto';

export class UpdateCasilleroDto extends PartialType(CreateCasilleroDto) {}