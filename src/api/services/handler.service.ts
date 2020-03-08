import { Response } from 'express-serve-static-core';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Service } from 'typedi';

@Service()
export class HandlerService {
    handleSuccess(res: Response, data: any, status = OK) {
        return res.status(status).json({
            data,
            success: true,
            token: null
        })
    }

    handleError(res: Response, error: any, status = INTERNAL_SERVER_ERROR) {
        return res.status(status).json({
            error,
            success: false
        })
    }
}