import { Fila } from "src/filas/entities/fila.entity";
import { Imagen } from "src/imagenes/entities/imagen.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('casilleros')
export class Casillero {
    @PrimaryGeneratedColumn()
      casilleroId: number;
    @Column()
    salio: boolean;    
    
    //relacion de muchos casilleros con una fila
    @ManyToOne(()=> Fila, (fila)=> fila.casilleros)
    fila: Fila;
    
    @OneToOne(()=> Imagen)
    @JoinColumn()
    imagen: Imagen;

  }
  