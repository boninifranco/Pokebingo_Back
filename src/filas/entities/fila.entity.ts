import { Carton } from 'src/cartones/entities/carton.entity';
import { Casillero } from 'src/casilleros/entities/casillero.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('filas')
export class Fila {
  @PrimaryGeneratedColumn('increment')
  filaId: number;
  @Column()
  aciertos: number;

  @OneToMany(() => Casillero, (casilleros) => casilleros.fila, {cascade: true})

  @ManyToOne(() => Carton, (carton) => carton.fila, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartonId' })
  public carton: number;

  constructor(aciertos?: number, carton?: number) {
    this.aciertos = 0;
    if (carton) {
      this.carton = carton;
    }
  }

  public getAciertos(): number {
    return this.aciertos;
  }
  public setAciertos(aciertos: number): void {
    this.aciertos = aciertos;
  }
}
