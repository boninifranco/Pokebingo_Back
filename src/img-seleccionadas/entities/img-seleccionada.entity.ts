import { Imagen } from "src/imagenes/entities/imagen.entity";
import { Partida } from "src/partidas/entities/partida.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImgSeleccionada {

    @PrimaryGeneratedColumn()
    idSeleccionada: number;

    @ManyToOne(() => Partida, (partida) => partida.imgSeleccionadas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'partidaId' })
    partida: Partida;

    @ManyToOne(() => Imagen, { eager: true })
    @JoinColumn({ name: 'imagenId' })
    imagen: Imagen;
    
}
