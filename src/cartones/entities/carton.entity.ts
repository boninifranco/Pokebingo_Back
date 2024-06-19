import { Partida } from "src/partidas/entities/partida.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn('increment')
  cartonId: number;

  @Column()
  nroCarton: number;
  @Column()
  aciertos: number;

  @ManyToOne(()=> Partida, (partida)=> partida.cartones)
  partida: Partida;

  constructor(nroCarton: number, aciertos:number){
    this.nroCarton = nroCarton;
    this.aciertos = 0;
  }
  public getNroCarton(): number {return this.nroCarton};
  public setNroCarton(nroCarton: number): void {this.nroCarton = nroCarton};
  public getaciertos(): number {return this.aciertos};
  public setaciertos(aciertos: number): void {this.aciertos = aciertos};
}
