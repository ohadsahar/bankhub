import {Service} from "typedi";
import {BudgetDto} from "../dto/budget.dto";
import {Budget} from "../../entities/budget.entity";

@Service()
export class BudgetService {
    async create(budgetData: BudgetDto, user: any): Promise<Budget> {
        const budgetEntity = new Budget();
        budgetEntity.budgetName = budgetData.budgetName;
        budgetEntity.budgetMaxPrice = budgetData.budgetMaxPrice;
        budgetEntity.user = user;
        return Budget.save(budgetEntity);
    }

    async update(budgetData, budgetId: number): Promise<Budget> {
        const existsBudget = Budget.findOne(budgetId);
        if (!existsBudget) {
            return;
        }
        return Budget.save({...existsBudget, ...budgetData});
    }

    async deleteBudget(budgetId: number): Promise<any> {
        return Budget.delete(budgetId);
    }

    async get(): Promise<Budget[]> {
        return Budget.find();
    }

    async getById(budgetId: number): Promise<Budget> {
        return Budget.findOne(budgetId);
    }
}


