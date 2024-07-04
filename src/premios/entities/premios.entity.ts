import { StockPremios } from 'src/stock_premios/entities/stockpremios.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Premios {
  @PrimaryGeneratedColumn()
  @OneToMany((type) => StockPremios, (stockPremios) => stockPremios.id, {
    cascade: true,
  })
  id: number;
  @Column()
  creditos: number;
  @Column()
  descripcion: string;
}
