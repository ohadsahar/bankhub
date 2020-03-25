import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import "reflect-metadata";
import * as admin from 'firebase-admin';
import ApiRouter from "./api/routes";
import bootstrapDb from './config/db.config';
import getConfig from './config/env.config';
import {initJWT} from './config/jwt.config';
import Logger from './config/logger.config';
import {CronJob} from 'cron';
import 'dotenv/config'
import {Container} from "typedi";
import {CronService} from "./api/services/cron.service";

const cronService = Container.get(CronService);

const job = new CronJob('30 * * * * *', function () {
    cronService.notificationCron();
}, null, true, 'Asia/Jerusalem');
job.start();

const serviceAccount = require('../bankhub-c8db2-firebase-adminsdk-lcgzb-1ad270883a.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bankhub-c8db2.firebaseio.com"
});

const app = express();
const config = getConfig();
Logger.info('Starting server on 3..2..1..0');
Logger.info(`Env: ${config.name}`);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(ApiRouter);

async function init() {
    const db = await bootstrapDb();
    initJWT();
    if (db) {
        Logger.info('DB is connected');
    } else {
        Logger.error('Db not connected');
    }
    app.listen(config.port || 3000,
        () => Logger.info(`Server listing on port ${config.port || 3000}. Good Luck!`));
}

init();

export default app;

