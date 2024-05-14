import { PartialType } from '@nestjs/mapped-types';
import { CreateStockPremiosDto } from './create-stockpremios.dto';

export class UpdateStockPremiosDto extends PartialType(CreateStockPremiosDto) {}