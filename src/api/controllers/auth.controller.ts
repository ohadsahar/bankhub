import {Request, Response} from "express-serve-static-core";
import {Container} from 'typedi';
import {AuthService} from '../services/auth.service';
import {HandlerService} from '../services/handler.service';
import {plainToClass} from "class-transformer";
import {UserDto} from "../dto/user.dto";

const authService = Container.get(AuthService);
const handlerService = Container.get(HandlerService);

export const sendSms = async (req: Request, res: Response) => {
    try {
        const result = await authService.sendSms(req.body.phoneNumber);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const verifySms = async (req: Request, res: Response) => {
    try {
        const result = await authService.verifySms(req.body);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        handlerService.handleSuccess(res, req.user);
    } catch (error) {
        handlerService.handleError(res, error);
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const transformed = plainToClass(UserDto, req.body);
        const result = await authService.update(transformed, req.user, req.file);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        console.log(error);
        return handlerService.handleError(res, error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.deleteUser(parseInt(req.params.id));
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}