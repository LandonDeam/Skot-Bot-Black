import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("balance")
export class Balance {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 22})
    user!: string;

    @Column({type: "varchar", length: 22})
    bal!: number;

    @Column({type: "varchar", length: 22})
    bank!: number;

    @Column({type: "varchar", length: 22})
    time!: number;

    @Column({type: "varchar", length: 22})
    timeDeposited!: number;
}