import {OrderTypeEnum} from "../models/types.enum";

export class FilterDto {
    limit: number;
    skip: number;
    startDate: Date;
    endDate: Date;
    cardId: number;
    threeDaysAgo: boolean;
    order: OrderTypeEnum;
    categoryIds: Array<number>;
}