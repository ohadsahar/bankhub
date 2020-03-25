import {Container, Service} from "typedi";
import {AuthService} from "./auth.service";
import {FirebaseService} from "./firebase.service";

const authService = Container.get(AuthService);
const firebaseService = Container.get(FirebaseService);

@Service()
export class CronService {

    notificationCron() {
        try {
            let users;
            const usersToSendNotifications = [];
            new Promise(function (resolve, reject) {
                resolve(authService.getAllUsers());
            }).then(function (result) {
                // @ts-ignore
                const mappedUsers = result.map(data => {
                    if (data.settings && data.firebaseToken) {
                        return {firebaseToken: data.firebaseToken, settings: data.settings}
                    }
                })
                users = mappedUsers.filter(function (el) {
                    return el != null;
                });
                if (users.length > 0) {
                    const date = new Date();
                    const currentHour = date.getHours();
                    const currentMin = date.getMinutes();
                    users.forEach(user => {
                        if (user.settings.notificationHour === currentHour && user.settings.notificationMin === currentMin) {
                            usersToSendNotifications.push(firebaseService.pushNotification(user.firebaseToken));
                        }
                    })
                    Promise.all(usersToSendNotifications)
                        .then(() => {
                            console.log('finished');
                        });
                }
            });
        } catch (error) {
            return false;
        }
    }
}




