import { Router } from 'express';
import { router as AuthRoutes } from '../routes/auth.routes';
const ApiRouter = Router();

ApiRouter.use('/auth', AuthRoutes);

export default ApiRouter;