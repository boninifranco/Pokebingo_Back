import { Fila } from 'src/filas/entities/fila.entity';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('casilleros')
export class Casillero {
  @PrimaryGeneratedColumn('increment')
  casilleroId: number;
  @Column()
  salio: boolean;  

  @ManyToOne(() => Fila, (fila) => fila.filaId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filaId' })
  public fila: number;
  
  @Column()
  imagen: string;

  constructor(salio: boolean, fila: number) {
    this.salio = false;
    if (fila) {
      this.fila = fila;
    }
  }

  public getSalio(): boolean {
    return this.salio;
  }
  public setSalio(salio: boolean): void {
    this.salio = salio;
  }
}
