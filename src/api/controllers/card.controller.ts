import {Request, Response} from 'express';
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {plainToClass} from "class-transformer";
import {CardDto} from "../dto/card.dto";
import {CardService} from "../services/card.service";

const cardService = Container.get(CardService);
const handlerService = Container.get(HandlerService);

export const create = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(CardDto, req.body);
        const result = await cardService.create(transformed, req.user);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(CardDto, req.body);
        const result = await cardService.update(transformed, parseInt(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const result = await cardService.get(req.body);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const result = await cardService.getById(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const result = await cardService.deleteCard(parseInt(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}