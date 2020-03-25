import {Router} from 'express';
import {router as AuthRoutes} from '../routes/auth.routes';
import {router as CardRoutes} from './card.routes';
import {router as TransactionRoutes} from './transaction.routes';
import {router as CategoryRoutes} from './category.routes';
import {router as BudgetRoutes} from './budget.routes';
import {router as SettingsRoutes} from './settings.routes';
import {router as FileRoutes} from './file.routes';
import {router as BusinessRoutes} from './business.routes';
import {router as StatisticRoutes} from './statistic.routes';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRoutes);
ApiRouter.use('/card', CardRoutes);
ApiRouter.use('/transaction', TransactionRoutes);
ApiRouter.use('/category', CategoryRoutes);
ApiRouter.use('/budget', BudgetRoutes);
ApiRouter.use('/settings', SettingsRoutes);
ApiRouter.use('/files', FileRoutes);
ApiRouter.use('/business', BusinessRoutes);
ApiRouter.use('/statistic', StatisticRoutes);
export default ApiRouter;
