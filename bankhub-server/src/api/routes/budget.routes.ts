import {Router} from "express";
import {isAuthenticateGuard} from "../guards";
import {validationMiddleware} from "../middleware/validation.middleware";
import {BudgetDto} from "../dto/budget.dto";
import {create, deleteBudget, get, getById, update} from "../controllers/budget.controller";

export const router = Router()
    .post('/create', isAuthenticateGuard, validationMiddleware(BudgetDto), create)
    .put('/update/:id', isAuthenticateGuard, validationMiddleware(BudgetDto), update)
    .delete('/delete/:id', isAuthenticateGuard, deleteBudget)
    .get('/get', isAuthenticateGuard, get)
    .get('/get/:id', isAuthenticateGuard, getById)