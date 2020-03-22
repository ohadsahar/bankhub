import {Router} from "express";
import {isAuthenticateGuard} from "../guards";
import {validationMiddleware} from "../middleware/validation.middleware";
import {CategoryDto} from "../dto/category.dto";
import {create, deleteCategory, get, update} from "../controllers/category.controller";

export const router = Router()
    .post('/create', isAuthenticateGuard, validationMiddleware(CategoryDto), create)
    .put('/update/:id', isAuthenticateGuard, validationMiddleware(CategoryDto), update)
    .delete('/delete/:id', isAuthenticateGuard, deleteCategory)
    .get('/get', isAuthenticateGuard, get)