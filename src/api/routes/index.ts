import {Router} from 'express';
import {router as AuthRoutes} from '../routes/auth.routes';
import {router as CardRoutes} from './card.routes';
import {router as TransactionRoutes} from './transaction.routes';
import {router as CategoryRoutes} from './category.routes';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRoutes);
ApiRouter.use('/card', CardRoutes);
ApiRouter.use('/transaction', TransactionRoutes);
ApiRouter.use('/category', CategoryRoutes);
export default ApiRouter;