import { Desempeno } from "src/desempeno/entities/desempeno.entity";
import { Logueo } from "src/logueo/entities/logueo.entity";
import { Registro } from "src/registro/entities/registro.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    apellido:string;
    @Column()    
    nombre:string;
    @Column('text')
    celular:string;
    @Column('text')
    direccion:string;    
    @Column('boolean')
    administrador:boolean;

    @OneToMany(()=>Logueo,
        (logueo)=>logueo.idUsuario,
        //{cascade: true}
    )
    @JoinColumn()
    public logueos:Logueo[];


    @OneToOne(()=>Registro,
        (registro)=>registro.usuarioId
    )
    @JoinColumn()
    public registro:Registro;

    @OneToOne(()=>Desempeno,
        (desempeno)=>desempeno.jugador
    )
    @JoinColumn()
    public desempeno: Desempeno;
};
