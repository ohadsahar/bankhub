import {IsDefined} from "class-validator";

export class TransactionDto {

    @IsDefined()
    transactionName: string;

    @IsDefined()
    price: number;

    @IsDefined()
    payments: number;

    @IsDefined()
    date: Date;

    
}