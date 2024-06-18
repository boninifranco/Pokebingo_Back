import { Casillero } from "src/casilleros/entities/casillero.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('filas')
export class Fila {
    @PrimaryGeneratedColumn()
    filaId: number;
    @Column()
    aciertos: number;
    
    //relacion de una fila con muchos casilleros
    @OneToMany(()=> Casillero, (casilleros)=> casilleros.fila)
    casilleros: Casillero[];

    constructor(id: number, aciertos: number) {
      this.filaId = id;
      this.aciertos = aciertos;
    }

    public getAciertos(): number {return this.aciertos};
    public setAciertos(aciertos: number): void {this.aciertos = aciertos}; 
  }