import { Partida } from "src/partidas/entities/partida.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn()
  cartonesId: number;

  @Column()
  nroCarton: number;
  @Column()
  aciertos: number;

  @ManyToOne(()=> Partida, (partida)=> partida.cartones)
  partida: Partida;
}
