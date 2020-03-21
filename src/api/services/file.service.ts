import {Service} from "typedi";
import {createHash} from 'crypto'
import {FileModel} from '../../entities/file.entity';
import {S3} from 'aws-sdk';
import del from 'del'
import {readFile} from 'fs'
import {extname} from 'path'
import {promisify} from 'util'
import moment from 'moment';

@Service()
export class FileService {

    async create(fileData: FileModel) {
        await FileModel.save(fileData);
    }

    async removeS3(fileName: string) {
        return new Promise((resolve, reject) => {
            new S3().deleteObjects(
                {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Delete: {Objects: [{Key: fileName}]}
                },
                (error, data) => {
                    if (error) reject(error)
                    resolve(data)
                }
            )
        })
    }

    private cleanFile(filePath: string) {
        return del([filePath])
    }

    uploadImage({filename, originalname}: Express.Multer.File) {
        return this.uploadS3(process.env.UPLOAD_DIR + filename, originalname, ['.jpg', '.jpeg', '.png']);
    }

    uploadBuffer(Body, name: string, filePath?: string) {
        return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
            new S3().upload(
                {
                    Body,
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `${moment().format('YYYY-MM-DD')}/${createHash('sha1').update(Date.now().toString()).digest('hex')}/${createHash('md5').update(name).digest('hex')}/${name}`,
                    ACL: 'public-read'
                },
                async (error, data) => {
                    if (error) reject(error);
                    if (filePath) await this.cleanFile(filePath);
                    resolve(data)
                }
            )
        });
    }

    async uploadS3(filePath: string, originalName: string, extensions?: any[]) {
        this.checkExtension(filePath, originalName, extensions)
        const Body = await promisify(readFile)(filePath)
        return await this.uploadBuffer(Body, originalName, filePath)
    }

    checkExtension(filePath: string, originalName: string, extensions: string[]) {
        if (!extensions) return
        if (!filePath) throw new Error(
            'general.error.no_file',
        )
        if (!extensions.includes(extname(originalName).toLocaleLowerCase())) throw new Error(
            'general.error.file_ext',
        )
    }
}