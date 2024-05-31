import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desempeno {
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    jugador: number;
    @Column()
    puntos: number;
    @Column()
    creditos: number;
    @Column()
    cartonesComprados: number 
}
