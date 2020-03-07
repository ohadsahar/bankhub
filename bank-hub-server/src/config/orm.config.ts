import { UserEntity } from '../entities/user.entity';
import getConfig from "./env.config";

const config = getConfig();

const ormConfig = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    entities: [UserEntity],
    synchronize: config.synchronize || false,
    logging: config.logging || false,
    dropSchema: config.dropSchema || false
}

export default ormConfig;