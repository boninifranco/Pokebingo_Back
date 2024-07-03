
import { Desempenio } from "src/desempenio/entities/desempenio.entity";
import { Logueo } from "src/logueo/entities/logueo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['usuarioId'])
export class Registro {
    
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    contrasena: string;
    
    
        
    
    @OneToMany(()=>Logueo,
    (logueo)=>logueo.idUsuario,
    {cascade: true})

    @OneToOne(()=>Desempenio,
    (desempenio)=>desempenio.jugador,
    {cascade: true})
    //@Column()
    //usuarioId:Usuario;
    
    @OneToOne(()=>Usuario,
    
    (usuario)=>usuario.id,

    {onDelete:'CASCADE'}
    )
    @JoinColumn({name:'usuarioId'})
    usuarioId: number
    
}
   