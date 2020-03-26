import {Response} from 'express-serve-static-core';
import {INTERNAL_SERVER_ERROR, OK} from 'http-status-codes';
import {Service} from 'typedi';
import {ValidationError} from "class-validator";

@Service()
export class HandlerService {
    handleSuccess(res: Response, data: any, status = OK) {
        return res.status(status).json({
            data,
            success: true
        })
    }

    handleError(res: Response, error: any, status = INTERNAL_SERVER_ERROR) {
        return res.status(status).json({
            error,
            success: false
        })
    }

    handleValidationErrors(res: Response, validationErrors: ValidationError[]) {
        const failedConstraints = validationErrors.map(err => err.constraints);
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: failedConstraints,
            success: false,
        })
    }
}
