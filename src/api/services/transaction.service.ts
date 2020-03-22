import {Service} from "typedi";
import {Transaction} from "../../entities/transaction.entity";
import {TransactionDto} from "../dto/transaction.dto";

@Service()
export class TransactionService {

    async create(transactionData: TransactionDto, cardId: number): Promise<Transaction> {
        const transactionEntity = new Transaction();
        transactionEntity.transactionName = transactionData.transactionName;
        transactionEntity.price = transactionData.price;
        transactionEntity.payments = transactionData.payments;
        transactionEntity.transactionDate = new Date(transactionData.transactionDate).toDateString();
        transactionEntity.eachMonth = transactionData.eachMonth;
        transactionEntity.note = transactionData.note;
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
        return Transaction.find();
    }
}