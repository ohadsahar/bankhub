import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { MainEntity } from "../api/models/main.abstract";
import { Card } from "./card.entity";

@Entity()
export class BankAccount extends MainEntity {

    @Column()
    branch: number;

    @Column()
    accountNumber: number;

    @Column()
    bankName: string;

    @OneToOne(type => Card, card => card.bankAccount)
    @JoinColumn()
    card: Card | Card['id']
}