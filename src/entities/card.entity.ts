import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {MainEntity} from "../api/models/main.abstract";
import {User} from "./user.entity";
import {Transaction} from "./transaction.entity";
import {BankAccount} from "./bank-account.entity";
import {PaymentDateEnum} from "../api/models/types.enum";

@Entity()
export class Card extends MainEntity {

    @Column()
    cardName: string;

    @Column()
    cardNumber: string;

    @Column()
    cardBudget: number;

    @Column()
    cardLogo: string;

    @Column({nullable: true})
    syncId: number;

    @Column()
    datePayment: PaymentDateEnum;

    @ManyToOne(type => User, user => user.cards, {cascade: true})
    user: User | User['id']

    @OneToMany(type => Transaction, transaction => transaction.card)
    @JoinColumn()
    transactions: Transaction[];

    @OneToOne(type => BankAccount, bankAccount => bankAccount.card, {cascade: true})
    bankAccount: BankAccount | BankAccount['id']

}