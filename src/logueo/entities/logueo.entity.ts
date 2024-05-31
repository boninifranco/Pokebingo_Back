import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Logueo {
    @PrimaryGeneratedColumn('increment')
    id: number;
    //@Column('int')
    //idUsuario: number;
    @Column()
    logueado: boolean;
    @Column()
    login: Date;
    @Column()
    logout: Date;
    @ManyToOne(()=>Usuario,
        (usuario)=>usuario.logueos
    )
    @JoinColumn()
    public idUsuario:Usuario;
    
}
