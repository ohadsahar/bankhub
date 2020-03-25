import {ClassType} from "class-transformer/ClassTransformer";
import {Request, Response} from 'express';
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {HandlerService} from "../services/handler.service";
import {Container} from "typedi";
import {isEmpty} from "lodash";

const handlerService = Container.get(HandlerService);

export const validationMiddleware = <T>(clazz: ClassType<T>) => {
    return async (req: Request, res: Response, next) => {
        const transformed = plainToClass(clazz, req.body);
        const errors = await validate(transformed);
        if (errors && !isEmpty(errors)) {
            return handlerService.handleValidationErrors(res, errors);
        }
        next();
    }
}