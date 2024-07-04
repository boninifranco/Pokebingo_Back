import { Fila } from "src/filas/entities/fila.entity";
import { Imagen } from "src/imagenes/entities/imagen.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('casilleros')
export class Casillero {
    @PrimaryGeneratedColumn('increment')
      casilleroId: number;
    @Column()
    salio: boolean;    
      
    @ManyToOne(() => Fila, fila => fila.casilleros, {onDelete: 'CASCADE',})
    @JoinColumn({name: 'filaId'})
    public fila: Fila;

    @OneToOne(() => Imagen, imagen => imagen.casillero ,{cascade: true, onDelete: 'CASCADE'  })
    imagen: Imagen;

    constructor(salio: boolean, fila: Fila){
      this.salio = false;
      if (fila) {
        this.fila = fila;
    }
    }

    public getSalio(): boolean {return this.salio};
    public setSalio(salio: boolean): void {this.salio = salio};
  }
  