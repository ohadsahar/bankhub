import {Request, Response} from 'express';
import {plainToClass} from "class-transformer";
import {SettingsDto} from "../dto/settings.dto";
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {SettingsService} from "../services/settings.service";

const handlerService = Container.get(HandlerService);
const settingsService = Container.get(SettingsService);

export const create = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(SettingsDto, req.body);
        const result = await settingsService.create(transformed, req.user);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const result = await settingsService.get();
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(SettingsDto, req.body);
        const result = await settingsService.update(transformed, Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const result = await settingsService.getById(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}



