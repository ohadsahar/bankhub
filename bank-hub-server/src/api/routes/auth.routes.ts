import { Router } from 'express';
import { getMe, sendSms, update, verifySms } from '../controllers/auth.controller';
import { isAuthenticateGuard } from '../guards/index';
import multer from 'multer';
import getConfig from '../../config/env.config';


const handleProfilePicture = multer({ dest: getConfig().s3.upload_dir }).single(`profileImage`);

export const router = Router()
    .post('/sendSms', sendSms)
    .post('/verifySms', verifySms)
    .get('/me', isAuthenticateGuard, getMe)
    .post('/update', handleProfilePicture, isAuthenticateGuard, update)