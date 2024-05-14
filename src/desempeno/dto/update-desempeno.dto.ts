import { PartialType } from '@nestjs/mapped-types';
import { CreateDesempenoDto } from './create-desempeno.dto';

export class UpdateDesempenoDto extends PartialType(CreateDesempenoDto) {}
