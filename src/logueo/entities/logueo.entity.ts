import { Registro } from "src/registro/entities/registro.entity";
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
    
    @ManyToOne(type=>Registro, registro=>registro.id,
        {onDelete:'CASCADE'}
    )
    @JoinColumn()
    idUsuario:Registro;   
}
