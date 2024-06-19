import { Casillero } from "src/casilleros/entities/casillero.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('filas')
export class Fila {
    @PrimaryGeneratedColumn('increment')
    filaId: number;
    @Column()
    aciertos: number;
    
    //relacion de una fila con muchos casilleros
    @OneToMany(()=> Casillero, (casilleros)=> casilleros.fila)
    casilleros: Casillero[];

    constructor(aciertos: number) {
      this.aciertos = aciertos;
    }

    public getAciertos(): number {return this.aciertos};
    public setAciertos(aciertos: number): void {this.aciertos = aciertos}; 
  }