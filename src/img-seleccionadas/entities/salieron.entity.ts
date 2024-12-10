import { Imagen } from "src/imagenes/entities/imagen.entity";
import { Partida } from "src/partidas/entities/partida.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salieron {

    @PrimaryGeneratedColumn()
    idSalio:number;

    @Column()
    id:number
    
    @Column()
    nombre: string;

    @Column()
    url: string;

    @Column()
    imagenId: number;
    
}
