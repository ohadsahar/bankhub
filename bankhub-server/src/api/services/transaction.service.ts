import {Service} from "typedi";
import {Transaction} from "../../entities/transaction.entity";
import {TransactionDto} from "../dto/transaction.dto";
import moment from "moment";

@Service()
export class TransactionService {

    async create(transactionData: TransactionDto, cardId: number): Promise<Transaction> {
        const transactionEntity = new Transaction();
        transactionEntity.business = transactionData.businessId;
        transactionEntity.price = transactionData.price;
        transactionEntity.payments = transactionData.payments;
        const isoDate = moment(transactionData.transactionDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
        transactionEntity.transactionDate = isoDate;
        transactionEntity.eachMonth = transactionData.eachMonth;
        transactionEntity.note = transactionData.note;
        transactionEntity.totalPayment = transactionData.totalPayment;
        transactionEntity.card = cardId;
        transactionEntity.category = transactionData.categoryId;
        return Transaction.save(transactionEntity);
    }

    async update(transactionData, transactionId: number): Promise<Transaction> {
        const existsTransaction = await Transaction.findOne(transactionId);
        if (!existsTransaction) {
            return;
        }
        return Transaction.save({...existsTransaction, ...transactionData});
    }

    async deleteTransaction(transactionId: number): Promise<any> {
        return Transaction.delete(transactionId);
    }

    async getById(transactionId: number): Promise<Transaction> {
        return Transaction.findOne(transactionId);
    }

    async get(): Promise<Transaction[]> {
        return Transaction.find({relations:['card']});
    }

}
