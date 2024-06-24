import { PartialType } from '@nestjs/mapped-types';
import { CreateDesempenioDto } from './create-desempenio.dto';

export class UpdateDesempenioDto extends PartialType(CreateDesempenioDto) {}
