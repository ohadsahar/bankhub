import {Request, Response} from 'express';
import {plainToClass} from "class-transformer";
import {BudgetDto} from "../dto/budget.dto";
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {BudgetService} from "../services/budget.service";

const handlerService = Container.get(HandlerService);
const budgetService = Container.get(BudgetService);

export const create = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(BudgetDto, req.body);
        const result = await budgetService.create(transformed, req.user);
        return handlerService.handleSuccess(res, result)
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(BudgetDto, req.body);
        const result = await budgetService.update(transformed, Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const deleteBudget = async (req: Request, res: Response) => {
    try {
        const result = await budgetService.deleteBudget(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const result = await budgetService.get();
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const result = await budgetService.getById(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}