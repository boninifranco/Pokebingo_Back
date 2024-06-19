
import { Desempenio } from "src/desempeno/entities/desempeno.entity";
import { Logueo } from "src/logueo/entities/logueo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Registro {
    @OneToMany(()=>Logueo,
        (logueo)=>logueo.idUsuario,
        {cascade: true})
    @OneToOne(()=>Desempenio,
        (desempenio)=>desempenio.jugador,
        {cascade: true})
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    contrasena: string;
        
    @OneToOne(type=>Usuario, (usuario)=>usuario.id,
    {onDelete:'CASCADE'}
    )
    @JoinColumn()
    usuarioId:Usuario;
}
   