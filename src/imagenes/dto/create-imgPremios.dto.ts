import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateImgPremiosDto {
 
  @IsString()
  secureUrl: string;  

}
