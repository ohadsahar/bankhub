import minimist, {ParsedArgs} from 'minimist';
import * as path from 'path';

const argv: ParsedArgs = minimist(process.argv.slice(2));

const constants = {
    sms: {
        accountSid: 'AC1ce787397d5adfcd197c034895eb34f5',
        serviceVerifyToken: 'VAcee7acb1b5b2e2124fb2eb713101b27b',
        authToken: '9880c4b8a45e3b637e21a581bf9548bd',
        smsMessage: 'היי שמחים שאתתם מצטרפים למשפחת WeDiet אנא הזינו את הקוד שלכם',
        channel: 'sms',
        amount: '4'
    },
    notification: {
        title: "Bankhub - ניהול נכון ויעיל של הבנק שלך",
        body: "היי! שמנו לב שהגיע הזמן להכניס את עסקאות היום",
        icon: "default",
    },
    jwt: {
        token_expires: '1 days',
        key: "l23@#shfa1340**@dfg009Alk3#Vk_anlj",
        ignoreExpiration: false
    },
    s3: {
        upload_dir: 'bankhub-uploads'
    }
}

export interface IConfig {
    name: string;
    production: boolean;
    synchronize: boolean;
    dropSchema: boolean;
    logLevel: string;
    port: number;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPass: string;
    dbName: string;
    logging: boolean;
    sms: {
        accountSid: string;
        serviceVerifyToken: string;
        authToken: string;
        smsMessage: string;
        channel: string;
        amount: string;
    },
    jwt: {
        token_expires: string,
        key: string,
        ignoreExpiration: boolean
    },
    notification: {
        title: string;
        body: string;
        icon: string;
    },
    s3: {
        upload_dir: string;
    }
}

let config: any;
const init = () => {
    const envPath = path.join(path.dirname(__dirname), 'env');
    switch (argv.env) {
        case 'dev':
            config = require(path.join(envPath, 'dev.json'));
            break;
        default:
            config = require(path.join(envPath, 'dev.json'));
            break;
    }
    return Object.assign(config, constants);
}

const getConfig = (): IConfig => {
    return config || init();
}

export default getConfig;