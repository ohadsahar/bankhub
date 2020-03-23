import {Request, Response} from 'express';
import {Container} from "typedi";
import {HandlerService} from "../services/handler.service";
import {FileService} from "../services/file.service";

const handlerService = Container.get(HandlerService);
const fileService = Container.get(FileService);

export const upload = async (req: Request, res: Response) => {
    try {
        const result = await fileService.uploadExcel(req.file);
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        return handlerService.handleError(res, error);
    }
}