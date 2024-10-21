import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('resultado')
export class Resultado {

    @PrimaryGeneratedColumn('increment')
    resultadoId: number;

    @Column()
    resultado: number;

    @OneToMany(type=> )
}
