import { Router } from 'express';
import { getMe, sendSms, update, verifySms } from '../controllers/auth.controller';
import { isAuthenticateGuard } from '../guards/index';

export const router = Router()
    .post('/sendSms', sendSms)
    .post('/verifySms', verifySms)
    .get('/me', isAuthenticateGuard, getMe)
    .post('/update', isAuthenticateGuard, update)