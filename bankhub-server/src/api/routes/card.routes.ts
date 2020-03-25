import {Router} from "express";
import {validationMiddleware} from "../middleware/validation.middleware";
import {CardDto} from "../dto/card.dto";
import {isAuthenticateGuard} from "../guards";
import {create, deleteCard, get, update} from "../controllers/card.controller";


export const router = Router()
    .post('/create', validationMiddleware(CardDto), isAuthenticateGuard, create)
    .put('/update/:id', validationMiddleware(CardDto), isAuthenticateGuard, update)
    .delete('/delete/:id', isAuthenticateGuard, deleteCard)
    .get('/get', isAuthenticateGuard, get)
