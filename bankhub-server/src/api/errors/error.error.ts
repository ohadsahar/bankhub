import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import Logger from "../../config/logger.config";

class ExtendableError {
    costumeError = true;

    constructor(public errorMsgCode: string, public logMessage: string, public error: Error, public httpStatus: number = INTERNAL_SERVER_ERROR) {
        Logger.error(logMessage);
        Logger.error(error.message);
    }

    toJson() {
        return {
            msgCode: this.errorMsgCode,
            msg: this.logMessage,
            originalErrorMsg: this.error.message,
            httpStatus: this.httpStatus
        }
    }
}

export default ExtendableError;