import getConfig from "./env.config";
import {FileModel} from "../entities/file.entity";
import {User} from "../entities/user.entity";
import {Card} from "../entities/card.entity";
import {BankAccount} from "../entities/bank-account.entity";
import {Transaction} from "../entities/transaction.entity";
import {Category} from "../entities/category.entity";
import {Budget} from "../entities/budget.entity";
import {Settings} from "../entities/settings.entity";
import {Business} from "../entities/business.entity";

const config = getConfig();

const ormConfig = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    entities: [User, FileModel, Card, BankAccount, Transaction, Category, Budget, Settings, Business],
    synchronize: config.synchronize || false,
    logging: config.logging || false,
    dropSchema: config.dropSchema || false
}

export default ormConfig;