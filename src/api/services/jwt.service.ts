import * as jwt from 'jsonwebtoken';
import getConfig from '../../config/env.config';

export class JwtService {
    createJwt(payload: { phoneNumber: string }) {
        return jwt.sign(payload, getConfig().jwt.key,
            { expiresIn: getConfig().jwt.token_expires });
    }
}