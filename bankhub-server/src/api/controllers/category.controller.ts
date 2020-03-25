import {Request, Response} from 'express';
import {plainToClass} from "class-transformer";
import {CategoryDto} from "../dto/category.dto";
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {CategoryService} from "../services/category.service";

const categoryService = Container.get(CategoryService);
const handlerService = Container.get(HandlerService);

export const create = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(CategoryDto, req.body);
        const result = await categoryService.create(transformed, req.user);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(CategoryDto, req.body);
        const result = await categoryService.update(transformed, Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.deleteCategory(Number(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.get(req.user);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}