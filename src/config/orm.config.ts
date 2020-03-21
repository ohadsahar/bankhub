import getConfig from "./env.config";
import {FileModel} from "../entities/file.entity";
import {User} from "../entities/user.entity";

const config = getConfig();

const ormConfig = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    entities: [User, FileModel],
    synchronize: config.synchronize || false,
    logging: config.logging || false,
    dropSchema: config.dropSchema || false
}

export default ormConfig;