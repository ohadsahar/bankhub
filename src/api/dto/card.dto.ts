import {IsDefined} from "class-validator";
import {PaymentDateEnum} from "../models/types.enum";

export class CardDto {

    @IsDefined()
    cardName: string;

    @IsDefined()
    cardNumber: string;

    @IsDefined()
    cardBudget: number;

    @IsDefined()
    cardLogo: string;

    @IsDefined()
    branch: number;

    @IsDefined()
    accountNumber: number;

    @IsDefined()
    bankName: string;

    @IsDefined()
    datePayment: PaymentDateEnum;


}