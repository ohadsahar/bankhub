import {IsDefined} from "class-validator";
import {NotificationTimeEnum} from "../models/types.enum";

export class SettingsDto {

    @IsDefined()
    notificationTime: NotificationTimeEnum;

    @IsDefined()
    notificationHour: number;

    @IsDefined()
    notificationMin: number;
}
