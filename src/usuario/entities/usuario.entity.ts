
import { Registro } from "src/registro/entities/registro.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    /*@OneToOne(()=>Registro,
        (registro)=>registro.usuarioId,       
    )*/    
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    apellido:string;
    @Column()    
    nombre:string;
    @Column('text')
    dni: string;
    @Column('text')
    celular:string;
    @Column('text')
    direccion:string;    
    @Column('boolean')
    administrador:boolean;
    /*@OneToOne(()=>Registro,    
    {onDelete:'CASCADE'}
    )*/
    //@JoinColumn()
    //usuarioId: number
};
