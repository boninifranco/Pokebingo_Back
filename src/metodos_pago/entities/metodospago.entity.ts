import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MetodosPago {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    descripcion: string;
}
