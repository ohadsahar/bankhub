import {Request, Response} from 'express';
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {TransactionService} from "../services/transaction.service";
import {plainToClass} from "class-transformer";
import {TransactionDto} from "../dto/transaction.dto";

const handlerService = Container.get(HandlerService);
const transactionService = Container.get(TransactionService);

export const create = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(TransactionDto, req.body);
        const result = await transactionService.create(transformed, Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(TransactionDto, req.body);
        const result = await transactionService.update(transformed, Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const result = await transactionService.deleteTransaction(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const result = await transactionService.getById(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const result = await transactionService.get();
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}
