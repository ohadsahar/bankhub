import {Request, Response} from 'express';
import {Container} from "typedi";
import {StatisticService} from "../services/statistic.service";
import {HandlerService} from "../services/handler.service";

const statisticService = Container.get(StatisticService);
const handlerService = Container.get(HandlerService);

export const eachMonth = async (req: Request, res: Response) => {
    try {
        const result = await statisticService.eachMonth();
        return handlerService.handleSuccess(res, result);
    } catch (error) {
        console.log(error);
        return handlerService.handleError(res, error);
    }
}
