import { Fila } from 'src/filas/entities/fila.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('casilleros')
export class Casillero {
  @PrimaryGeneratedColumn('increment')
  casilleroId: number;
  @Column()
  salio: boolean;
  
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Fila, (fila) => fila.filaId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filaId' })
  public filaId: number;
  // Relación Many-to-One con Fila
  /*@ManyToOne(() => Fila, (fila) => fila.casillero, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'filaId' })
  fila: Fila;  // Esta es la relación con la entidad Fila

  @Column()  // Este es el campo filaId como columna normal
  filaId: number;*/

  
  
  //@Column()
  //imagenId: number;

  @ManyToOne(() => Imagen,(imagen) => imagen.imagenId,{ onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'imagenId' })
  imagenId: number;


  constructor(salio: boolean, fila: number) {
    this.salio = false;
    if (fila) {
      this.filaId = fila;
    }
  }

  public getSalio(): boolean {
    return this.salio;
  }
  public setSalio(salio: boolean): void {
    this.salio = salio;
  }
}
