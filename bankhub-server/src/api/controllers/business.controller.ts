import {Request, Response} from 'express';
import {plainToClass} from "class-transformer";
import {BusinessDto} from "../dto/business.dto";
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {BusinessService} from "../services/business.service";

const handlerService = Container.get(HandlerService);
const businessService = Container.get(BusinessService);

export const create = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(BusinessDto, req.body);
        const result = await businessService.create(transformed, req.user, req.file);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(BusinessDto, req.body);
        const result = await businessService.update(transformed, req.user, Number(req.params.id), req.file);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const result = await businessService.getById(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const deleteBusiness = async (req: Request, res: Response) => {
    try {
        const result = await businessService.deleteBusiness(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}


export const get = async (req: Request, res: Response) => {
    try {
        const result = await businessService.get();
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}
