import twilio from 'twilio';
import { Container, Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import getConfig from '../../config/env.config';
import { UserEntity } from '../../entities/user.entity';
import { SmsValidateDto } from '../models/sms-validate.dto';
import { JwtService } from './jwt.service';
import { FileEntity } from '../../entities/file.entity';
import { FileService } from './file.service';

const jwtService = Container.get(JwtService);
const fileService = Container.get(FileService);
@Service()
export class AuthService {

    userRepository: Repository<UserEntity>;

    getUserRepository() {
        if (!this.userRepository) {
            this.userRepository = getRepository(UserEntity);
        }
        return this.userRepository;
    }

    async sendSms(phoneNumber: string) {
        const client = twilio(getConfig().sms.accountSid, getConfig().sms.authToken);
        const resultOfSms = await client.verify.services(getConfig().sms.serviceVerifyToken).verifications
            .create({
                to: phoneNumber, channel: getConfig().sms.channel, amount: getConfig().sms.amount
            });
        return resultOfSms;
    }

    async verifySms(verifyData: SmsValidateDto) {
        let validResult: any;
        const client = twilio(getConfig().sms.accountSid, getConfig().sms.authToken);
        const result = await client.verify.services(getConfig().sms.serviceVerifyToken)
            .verificationChecks
            .create({ to: verifyData.phoneNumber, code: verifyData.code });
        if (result.valid) {
            validResult = await this.register(verifyData.phoneNumber);
        }
        return validResult;
    }

    async register(phoneNumber: string) {
        const userEntity = new UserEntity();
        userEntity.phoneNumber = phoneNumber;
        userEntity.userToken = await this.login(phoneNumber);
        return await this.getUserRepository().save(userEntity);
    }

    async login(phoneNumber: string) {
        return jwtService.createJwt({ phoneNumber });
    }

    async findByPhoneNumber(phoneNumber: string) {
        return await this.getUserRepository().findOne({ phoneNumber });
    }

    async update(userData: UserEntity, user: any, profileImage?) {
        if (profileImage) {
            userData.file = await this.handleImage(user, profileImage);
        }
        const result = await this.findByPhoneNumber(user.phoneNumber);
        if (!result) { return; }
        return await this.getUserRepository().save({ ...result, ...userData });
    }

    async handleImage(user: any, profileImage) {
        const fileEntity = new FileEntity();
        fileEntity.uploader = user;
        fileEntity.fileName = profileImage.filename;
        fileEntity.filePath = profileImage.path;
        return await fileService.create(fileEntity);
    }
}

