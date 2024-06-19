import { PartialType } from '@nestjs/mapped-types';
import { CreateDesempenioDto } from './create-desempeno.dto';

export class UpdateDesempenioDto extends PartialType(CreateDesempenioDto) {}
