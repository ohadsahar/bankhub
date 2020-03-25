import {Container} from "typedi";
import {TransactionService} from "./transaction.service";
import lodash from 'lodash';

const transactionService = Container.get(TransactionService);

export class StatisticService {

    async eachMonth() {
        const allTransactions = await transactionService.get();
        const orderByCards = lodash(allTransactions).groupBy('card.id')
            .map((items, cardId) => ({
                cardId,
                totalPayment: lodash.sumBy(items, 'totalPayment'),
            })).value();

        const groupByMonth = lodash(allTransactions).groupBy('transactionDate')
            .map((items, transactionDate) => ({
                transactionDate,
                price: lodash.sumBy(items, 'totalPayment'),
            })).value();
        return {groupByMonth, orderByCards};
    }

}
