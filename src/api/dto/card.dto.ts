import {IsDefined} from "class-validator";

export class CardDto {

    @IsDefined()
    cardName: string;

    @IsDefined()
    cardNumber: string;

    @IsDefined()
    cardBudget: number;

    @IsDefined()
    cardLogo: string;

}