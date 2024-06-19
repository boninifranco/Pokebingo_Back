import { Fila } from "src/filas/entities/fila.entity";
import { Imagen } from "src/imagenes/entities/imagen.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('casilleros')
export class Casillero {
    @PrimaryGeneratedColumn('increment')
      casilleroId: number;
    @Column()
    salio: boolean;    
    
    //relacion de muchos casilleros con una fila
    @ManyToOne(()=> Fila, (fila)=> fila.casilleros)
    fila: Fila;
    
    @OneToOne(()=> Imagen)
    @JoinColumn()
    imagen: Imagen;

    constructor(salio: boolean){
      this.salio = false;
    }
    public getSalio(): boolean {return this.salio};
    public setSalio(salio: boolean): void {this.salio = salio};
  }
  