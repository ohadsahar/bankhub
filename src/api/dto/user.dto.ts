import {IsDefined} from "class-validator";

export class UserDto {

    @IsDefined()
    fullName: string;

    @IsDefined()
    phoneNumber: string;

}