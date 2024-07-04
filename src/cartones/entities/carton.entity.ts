import { Fila } from "src/filas/entities/fila.entity";
import { Partida } from "src/partidas/entities/partida.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cartones')
export class Carton {
  @PrimaryGeneratedColumn('increment')
  cartonId: number;
  @Column()
  aciertos: number;

  @ManyToOne(()=> Partida, (partida)=> partida.cartones)
  @JoinColumn({name: 'partidaId'})
  partida: Partida;

  @OneToMany(() => Fila, (fila) => fila.carton,{ cascade: true, onDelete: 'CASCADE'  })
  @JoinColumn({ name: 'chatId' })
  public fila: Fila[];

  constructor(nroCarton: number, partida: Partida){
    this.aciertos = 0;
  }

  public getaciertos(): number {return this.aciertos};
  public setaciertos(aciertos: number): void {this.aciertos = aciertos};
}
