import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("devgroups")
export class DevGroups {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user!: number;

    @Column({type: "varchar"})
    group!: string;
}