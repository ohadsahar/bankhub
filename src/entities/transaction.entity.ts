import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MainEntity } from "../api/models/main.abstract";
import { Card } from "./card.entity";
import { Category } from "./category.entity";
@Entity()
export class Transaction extends MainEntity {

    @Column()
    transactionName: string;

    @Column()
    price: number;

    @Column()
    payments: number;

    @Column()
    eachMonth: number;

    @Column()
    transactionDate: string;

    @Column({nullable: true})
    note: string;

    @ManyToOne(type => Card, card => card.transactions, {cascade: true})
    card: Card | Card['id'];

    @ManyToOne(type => Category, category => category.transaction, {cascade: true})
    @JoinColumn()
    category: Category | Category['id'];
}