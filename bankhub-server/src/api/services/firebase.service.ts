import {Service} from "typedi";
import * as admin from "firebase-admin";
import getConfig from '../../config/env.config';

@Service()
export class FirebaseService {
    async pushNotification(token: string, title?: string, body?: string, icon?: string) {
        try {
            const fireBaseToken = token;
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24,
            }
            const payload = {
                notification: {
                    title: title === undefined ? getConfig().notification.title : title,
                    body: body === undefined ? getConfig().notification.body : body,
                    icon: icon === undefined ? getConfig().notification.icon : icon
                },
            };
            const result = await admin.messaging().sendToDevice(fireBaseToken, payload, options);
            if (!result) {
                return;
            }
            return result;
        } catch (error) {
            return error;
        }
    }
}