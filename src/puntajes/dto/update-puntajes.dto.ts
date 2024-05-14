import { PartialType } from '@nestjs/mapped-types';
import { CreatePuntajesDto } from './create-puntajes.dto';

export class UpdatePuntajesDto extends PartialType(CreatePuntajesDto) {}
