import {Router} from "express";
import {isAuthenticateGuard} from "../guards";
import {eachMonth} from "../controllers/statistic.controller";


export const router = Router()
    .get('/each-month-total-payment', isAuthenticateGuard, eachMonth)
