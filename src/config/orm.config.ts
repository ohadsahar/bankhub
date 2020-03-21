import getConfig from "./env.config";
import {FileModel} from "../entities/file.entity";
import {User} from "../entities/user.entity";
import {Card} from "../entities/card.entity";
import {BankAccount} from "../entities/bank-account.entity";
import {Transaction} from "../entities/transaction.entity";
import {Category} from "../entities/category.entity";

const config = getConfig();

const ormConfig = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    entities: [User, FileModel, Card, BankAccount, Transaction, Category],
    synchronize: config.synchronize || false,
    logging: config.logging || false,
    dropSchema: config.dropSchema || false
}

export default ormConfig;