import {Router} from "express";
import multer from "multer";
import {storage} from "../middleware/multer.middleware";
import {isAuthenticateGuard} from "../guards";
import {upload} from "../controllers/file.controller";

const handleFile = multer({storage}).single(`bankhub`);

export const router = Router()
    .post('/upload', handleFile, upload)