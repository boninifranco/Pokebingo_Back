import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('imgpremios')

export class ImgPremios {
  @PrimaryGeneratedColumn('increment')
  imgPremiosId: number;  

  @Column()
  secureUrl: string;
}