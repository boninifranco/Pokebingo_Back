import { PartialType } from '@nestjs/mapped-types';
import { CreateImgSeleccionadaDto } from './create-img-seleccionada.dto';

export class UpdateImgSeleccionadaDto extends PartialType(CreateImgSeleccionadaDto) {}
