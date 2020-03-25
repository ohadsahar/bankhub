import {Router} from "express";
import {isAuthenticateGuard} from "../guards";
import {create, deleteTransaction, get, getById, update} from "../controllers/transaction.controller";
import {validationMiddleware} from "../middleware/validation.middleware";
import {TransactionDto} from "../dto/transaction.dto";

export const router = Router()
    .post('/create/:id', validationMiddleware(TransactionDto), isAuthenticateGuard, create)
    .put('/update/:id', validationMiddleware(TransactionDto), isAuthenticateGuard, update)
    .delete('/delete/:id', isAuthenticateGuard, deleteTransaction)
    .get('/get', isAuthenticateGuard, get)
    .get('/get/:id', isAuthenticateGuard, getById)