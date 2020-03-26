import twilio from 'twilio';
import {Container, Service} from 'typedi';
import getConfig from '../../config/env.config';
import {User} from '../../entities/user.entity';
import {SmsValidateDto} from '../models/sms-validate.dto';
import {JwtService} from './jwt.service';
import {FileService} from './file.service';
import {FileModel} from "../../entities/file.entity";

const jwtService = Container.get(JwtService);
const fileService = Container.get(FileService);

@Service()
export class AuthService {

    async sendSms(phoneNumber: string) {
        const client = twilio(getConfig().sms.accountSid, getConfig().sms.authToken);
        const resultOfSms = await client.verify.services(getConfig().sms.serviceVerifyToken).verifications
            .create({
                to: phoneNumber, channel: getConfig().sms.channel, amount: getConfig().sms.amount
            });
        return resultOfSms;
    }

    async verifySms(verifyData: SmsValidateDto): Promise<string> {
        let validResult: any;
        const client = twilio(getConfig().sms.accountSid, getConfig().sms.authToken);
        const result = await client.verify.services(getConfig().sms.serviceVerifyToken)
            .verificationChecks
            .create({to: verifyData.phoneNumber, code: verifyData.code});
        if (result.valid) {
            validResult = await this.register(verifyData.phoneNumber);
        }
        return validResult;
    }

    async register(phoneNumber: string): Promise<string> {
        const userEntity = new User();
        userEntity.phoneNumber = phoneNumber;
        await User.save(userEntity);
        return this.login(phoneNumber);
    }

    async login(phoneNumber: string): Promise<string> {
        return jwtService.createJwt({phoneNumber});
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User> {
        return await User.findOne({phoneNumber}, {relations: ['settings', 'budget', 'cards', 'profilePicture']});
    }

    async update(userData, user: any, profileImage?): Promise<User> {
        const fileModel = new FileModel();
        const existsUser = await User.findOne(user.id);
        if (!existsUser) {
            return;
        }
        if (profileImage) {
            if (existsUser.profilePicture) {
                await fileService.removeS3(existsUser.profilePicture.fileName);
            }
            const {Location, Key} = await fileService.uploadImage(profileImage);
            fileModel.fileName = Key;
            fileModel.filePath = Location;
            fileModel.uploaderId = existsUser.id;
            existsUser.profilePicture = fileModel;
            await fileService.create(fileModel);
        }
        return User.save({...existsUser, ...userData});
    }

    async deleteUser(id: number): Promise<any> {
        return User.delete(id);
    }

    async getAllUsers(): Promise<User[]> {
        return await User.find({relations: ['settings']});
    }
}

