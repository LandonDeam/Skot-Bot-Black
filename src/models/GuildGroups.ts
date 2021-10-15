import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("guildgroups")
export class GuildGroups {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    guild!: number;

    @Column()
    user!: number;

    @Column({type: "varchar"})
    groups!: string;
}