import {IsDefined} from "class-validator";

export class BankAccountDto {

    @IsDefined()
    branch: number;

    @IsDefined()
    accountNumber: number;

    @IsDefined()
    bankName: string;
}