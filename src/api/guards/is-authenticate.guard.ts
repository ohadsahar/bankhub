import {NextFunction, Request, Response} from "express";
import {authenticate} from "passport";
import {Container} from "typedi";
import {ForbiddenError} from "../errors";
import {HandlerService} from '../services/handler.service';

const resService = Container.get(HandlerService);
export const validateJwt = (req: Request, res: Response, next: NextFunction) => {

    return authenticate('jwt', {session: false, failWithError: true}, (err, data, info) => {
        if (err) {
            return resService.handleError(res, new ForbiddenError('general.error.authenticate_jwt', 'error authenticating jwt', err));
        }
        if (!data) {
            return resService.handleError(res, new ForbiddenError('general.error.authenticate_jwt', 'error authenticating jwt', new Error("no data")))
        } else {
            req.user = data.user;
            req.isAuthenticated = () => true;
        }
        return next();
    })(req, res, next);
};
