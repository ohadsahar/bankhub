import {Service} from "typedi";
import {SettingsDto} from "../dto/settings.dto";
import {Settings} from "../../entities/settings.entity";

@Service()
export class SettingsService {

    async create(settingsData: SettingsDto, user: any): Promise<Settings> {
        const settingEntity = new Settings();
        settingEntity.notificationTime = settingsData.notificationTime;
        settingEntity.notificationHour = settingsData.notificationHour;
        settingEntity.notificationMin = settingsData.notificationMin;
        settingEntity.user = user;
        return Settings.save(settingEntity);
    }

    async update(settingsData, settingsId: number): Promise<Settings> {
        const existsSetting = Settings.findOne(settingsId);
        if (!existsSetting) {
            return;
        }
        return Settings.save({...existsSetting, ...settingsData});
    }

    async get(): Promise<Settings[]> {
        return Settings.find();
    }

    async getById(settingsId: number): Promise<Settings> {
        return Settings.findOne(settingsId);
    }
}