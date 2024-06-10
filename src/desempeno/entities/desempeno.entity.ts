import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desempeno {
    @PrimaryGeneratedColumn('increment')
    id:number;
    
    @Column()
    puntos: number;
    @Column()
    creditos: number;
    @Column()
    cartonesComprados: number;
    
    @OneToOne(type=>Usuario, (usuario)=>usuario.id)
    @JoinColumn()
    jugador: Usuario;
}
