
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Registro {
    @PrimaryGeneratedColumn('increment')
    id: number;
    //@Column('int')
    //usuarioId: number;
    @Column()
    email: string;
    @Column()
    contrasena: string;
    
    @OneToOne(type=>Usuario, (usuario)=>usuario.id)
    @JoinColumn()
    usuarioId:number;
    
}
