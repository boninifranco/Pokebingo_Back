import { Premios } from "src/premios/entities/premios.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StockPremios {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(type=>Premios, premio => premio.id,
        {onDelete:'CASCADE'}
    )
    @JoinColumn()
    premio: Premios;
    @Column()
    cantidad: number;
}
