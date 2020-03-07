import { Service } from "typedi";
import { Repository, getRepository } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';


@Service()
export class FileService {

    fileRepository: Repository<FileEntity>;

    getFileRepository() {
        if (!this.fileRepository) {
            this.fileRepository = getRepository(FileEntity);
        }
        return this.fileRepository;
    }

    async create(file: FileEntity) {
        return await this.getFileRepository().save(file);
    }


    // uploadBuffer(Body, name: string, filePath?: string) {
    //     return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
    //       new S3().upload(
    //         {
    //           Body,
    //           Bucket: process.env.AWS_S3_BUCKET,
    //           Key: `${moment().format('YYYY-MM-DD')}/${createHash('sha1').update(Date.now().toString()).digest('hex')}/${createHash('md5').update(name).digest('hex')}/${name}`,
    //           ACL: 'public-read'
    //         },
    //         async (error, data) => {
    //           if (error) reject(error);
    //           if (filePath) await this.cleanFile(filePath);
    //           resolve(data)
    //         }
    //       )
    //     });
    //   }

    //   private async uploadS3(filePath: string, originalName: string, extensions?: Array<any>) {
    //     this.checkExtension(filePath, originalName, extensions)
    //     const Body = await promisify(readFile)(filePath)
    //     return await this.uploadBuffer(Body, originalName, filePath)

    //   }

    //   create(params: DeepPartial<UploadedFile>) {
    //     return UploadedFile.create(params).save()
    //   }

    //   async uploadFileAndCreateFileObject(file: Express.Multer.File, uploaderId: User['id']) {

    //     const fileData = await this.uploadS3(file.path, file.originalname)
    //     return this.create({
    //       fileName: fileData.Key,
    //       uploader: { id: uploaderId },
    //       filePath: fileData.Location
    //     })

    //   }
}