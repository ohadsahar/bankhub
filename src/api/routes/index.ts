import {Router} from 'express';
import {router as AuthRoutes} from '../routes/auth.routes';
import {router as CardRoutes} from './card.routes';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRoutes);
ApiRouter.use('/card', CardRoutes);

export default ApiRouter;