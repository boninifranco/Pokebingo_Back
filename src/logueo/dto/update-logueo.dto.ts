import { PartialType } from '@nestjs/mapped-types';
import { CreateLogueoDto } from './create-logueo.dto';

export class UpdateLogueoDto extends PartialType(CreateLogueoDto) {}
