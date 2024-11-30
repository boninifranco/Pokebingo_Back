import { Partida } from "src/partidas/entities/partida.entity";
import { Puntajes } from "src/puntajes/entities/puntajes.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('resultado')
export class Resultado {

    @PrimaryGeneratedColumn('increment')
    resultadoId: number;

    //@Column()
    //resultado: string;

    @ManyToOne(type=> Partida, partida => partida.resultados)
    @JoinColumn({ name: 'partidaId' })
    public partida: Partida;

    @ManyToOne(type=> Usuario, usuario => usuario.resultados)
    @JoinColumn({ name: 'usuarioId' })
    public usuario: Usuario;

    @ManyToOne(type=> Puntajes, puntajes  => puntajes.resultados,{ onDelete: 'CASCADE', eager: true })
    @JoinColumn({name: 'idPuntaje'})
    public idPuntaje: Puntajes
    
}
