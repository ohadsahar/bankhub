import {Router} from 'express';
import {deleteUser, getMe, sendSms, update, verifySms} from '../controllers/auth.controller';
import {isAuthenticateGuard} from '../guards/index';
import multer from 'multer';
import {validationMiddleware} from "../middleware/validation.middleware";
import {UserDto} from "../dto/user.dto";
import {storage} from "../middleware/multer.middleware";


const handleProfilePicture = multer({storage}).single(`profileImage`);

export const router = Router()
    .post('/sendSms', sendSms)
    .post('/verifySms', verifySms)
    .get('/me', isAuthenticateGuard, getMe)
    .put('/update', handleProfilePicture, validationMiddleware(UserDto), isAuthenticateGuard, update)
    .delete('/delete/:id', isAuthenticateGuard, deleteUser)