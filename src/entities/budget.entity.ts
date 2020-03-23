import {Column, Entity, ManyToOne} from "typeorm";
import {MainEntity} from "../api/models/main.abstract";
import {User} from "./user.entity";
import {BudgetOptionsEnum} from "../api/models/types.enum";

@Entity()
export class Budget extends MainEntity {

    @Column()
    budgetName: BudgetOptionsEnum;

    @Column()
    budgetMaxPrice: number;

    @ManyToOne(type => User, user => user.budget, {cascade: true})
    user: User | User['id']

}