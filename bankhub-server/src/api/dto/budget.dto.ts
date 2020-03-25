import {IsDefined} from "class-validator";
import {BudgetOptionsEnum} from "../models/types.enum";

export class BudgetDto {

    @IsDefined()
    budgetName: BudgetOptionsEnum;

    @IsDefined()
    budgetMaxPrice: number;
}