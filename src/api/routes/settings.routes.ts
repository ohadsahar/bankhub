import {Router} from "express";
import {isAuthenticateGuard} from "../guards";
import {validationMiddleware} from "../middleware/validation.middleware";
import {SettingsDto} from "../dto/settings.dto";
import {create, get, getById, update} from "../controllers/settings.controller";

export const router = Router()
    .post('/create', isAuthenticateGuard, validationMiddleware(SettingsDto), create)
    .get('/get', isAuthenticateGuard, get)
    .get('/get/:id', isAuthenticateGuard, getById)
    .put('/update/:id', isAuthenticateGuard, validationMiddleware(SettingsDto), update)