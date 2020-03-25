import {IsDefined} from "class-validator";

export class TransactionDto {

    @IsDefined()
    businessId: number;

    @IsDefined()
    price: number;

    @IsDefined()
    payments: number;

    @IsDefined()
    transactionDate: string;

    @IsDefined()
    eachMonth: number;

    @IsDefined()
    note: string;

    @IsDefined()
    categoryId: number;


}