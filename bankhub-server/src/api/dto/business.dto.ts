import {IsDefined} from "class-validator";

export class BusinessDto {

    @IsDefined()
    businessName: string;
}