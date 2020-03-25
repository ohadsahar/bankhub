import {Container, Service} from "typedi";
import {BusinessDto} from "../dto/business.dto";
import {Business} from "../../entities/business.entity";
import {FileModel} from "../../entities/file.entity";
import {FileService} from "./file.service";

const fileService = Container.get(FileService);

@Service()
export class BusinessService {

    async create(businessData: BusinessDto, user: any, businessLogo?: any): Promise<Business> {
        const businessEntity = new Business();
        const fileModel = new FileModel();
        businessEntity.businessName = businessData.businessName;
        if (businessLogo) {
            const {Location, Key} = await fileService.uploadImage(businessLogo);
            fileModel.fileName = Key;
            fileModel.filePath = Location;
            fileModel.uploaderId = user.id;
            businessEntity.businessLogo = fileModel;
            await fileService.create(fileModel);
        }
        return Business.save(businessEntity);
    }

    async update(businessData, user: any, businessId: number, businessLogo?: any): Promise<Business> {
        const fileModel = new FileModel();
        const existsBusiness = await Business.findOne(businessId);
        if (businessLogo) {
            if (existsBusiness.businessLogo) {
                await fileService.removeS3(existsBusiness.businessLogo.fileName);
            }
            const {Location, Key} = await fileService.uploadImage(businessLogo);
            fileModel.fileName = Key;
            fileModel.filePath = Location;
            fileModel.uploaderId = user.id;
            existsBusiness.businessLogo = fileModel;
            await fileService.create(fileModel);
        }
        return Business.save({...existsBusiness, ...businessData})

    }

    async deleteBusiness(businessId): Promise<any> {
        return Business.delete(businessId);
    }

    async getById(businessId): Promise<Business> {
        return Business.findOne(businessId);
    }

    async get(): Promise<Business[]> {
        return Business.find();
    }

}