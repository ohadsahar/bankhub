export class FilterDto {
    limit: number;
    skip: number;
    startDate: Date;
    endDate: Date;
    cardId: number;
    threeDaysAgo: boolean;
}