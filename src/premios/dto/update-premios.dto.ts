import { PartialType } from '@nestjs/mapped-types';
import { CreatePremiosDto } from './create-premios.dto';

export class UpdatePremiosDto extends PartialType(CreatePremiosDto) {}
