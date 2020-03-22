import {IsDefined} from "class-validator";

export class TransactionDto {

    @IsDefined()
    transactionName: string;

    @IsDefined()
    price: number;

    @IsDefined()
    payments: number;

    @IsDefined()
    transactionDate: Date;

    @IsDefined()
    eachMonth: number;

    @IsDefined()
    note: string;

    @IsDefined()
    categoryId: number;

}