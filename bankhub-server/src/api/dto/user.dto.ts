import {IsDefined} from "class-validator";

export class UserDto {

    @IsDefined()
    phoneNumber: string;

}
