import { PartialType } from '@nestjs/mapped-types';
import { CreateImgPremiosDto } from './create-imgPremios.dto';

export class UpdateImgPremiosDto extends PartialType(CreateImgPremiosDto) {};