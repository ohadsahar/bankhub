import { createConnection } from 'typeorm';
import Logger from './logger.config';
import ormConfig from './orm.config';

const bootstrapDb = async () => {
    let con;
    try {
        con = await createConnection({ ...ormConfig, type: 'postgres' });
    } catch (error) {
        con = false;
        Logger.error(error.message);
    }
    return con;
}

export default bootstrapDb;