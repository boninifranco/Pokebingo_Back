import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Logueo {
    @PrimaryGeneratedColumn('increment')
    id: number;    
    @Column()
    logueado: boolean;
    @Column()
    login: string;    
    @Column()
    logout: string;
    
    
    @ManyToOne(type=>Usuario, usuario=>usuario.logueos,
        //{onDelete:'CASCADE'}
    )
    @JoinColumn()
    idUsuario:Usuario;   
}
