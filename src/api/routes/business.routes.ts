import {Router} from "express";
import {isAuthenticateGuard} from "../guards";
import {validationMiddleware} from "../middleware/validation.middleware";
import {BusinessDto} from "../dto/business.dto";
import multer from "multer";
import {storage} from "../middleware/multer.middleware";
import {create, deleteBusiness, get, getById, update} from "../controllers/business.controller";

const handleFile = multer({storage}).single(`businessLogo`);

export const router = Router()
    .post('/create', isAuthenticateGuard, handleFile, validationMiddleware(BusinessDto), create)
    .put('/update/:id', isAuthenticateGuard, handleFile, validationMiddleware(BusinessDto), update)
    .delete('/delete/:id', isAuthenticateGuard, deleteBusiness)
    .get('/get', isAuthenticateGuard, get)
    .get('/get/:id', isAuthenticateGuard, getById)