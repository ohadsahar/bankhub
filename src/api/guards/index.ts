import { validateJwt } from './is-authenticate.guard';

export const isAuthenticateGuard = [validateJwt];

