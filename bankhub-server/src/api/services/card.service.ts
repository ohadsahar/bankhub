import {Container, Service} from "typedi";
import {Card} from "../../entities/card.entity";
import {CardDto} from "../dto/card.dto";
import {BankAccountService} from "./bank-account.service";
import {FilterDto} from "../dto/filter.dto";
import moment from 'moment';

const bankAccountService = Container.get(BankAccountService);

@Service()
export class CardService {

    async create(cardData: CardDto, user: any): Promise<Card> {
        const cardEntity = new Card();
        cardEntity.user = user.id;
        cardEntity.cardName = cardData.cardName;
        cardEntity.cardNumber = cardData.cardNumber;
        cardEntity.cardBudget = cardData.cardBudget;
        cardEntity.cardLogo = cardData.cardLogo;
        cardEntity.datePayment = cardData.datePayment;
        cardEntity.syncId = user.id;
        const bankAccountData = {
            branch: cardData.branch,
            accountNumber: cardData.accountNumber,
            bankName: cardData.bankName
        };
        cardEntity.bankAccount = await bankAccountService.create(bankAccountData);
        return Card.save(cardEntity);
    }

    async update(cardData, cardId: number): Promise<Card> {
        const cardExists = await Card.findOne({id: cardId});
        if (!cardExists) {
            return;
        }
        if (cardData.bankAccount || cardData.branch || cardData.bankName) {
            const bankAccountData = {
                branch: cardData.branch,
                accountNumber: cardData.accountNumber,
                bankName: cardData.bankName
            };
            await bankAccountService.update(bankAccountData, cardId);
        }
        return Card.save({...cardData, ...cardExists});
    }

    async deleteCard(cardId: number): Promise<any> {
        return Card.delete(cardId);
    }

    async get(filter?: FilterDto) {
        let query = Card.createQueryBuilder("card")
            .leftJoinAndSelect("card.user", "user")
            .leftJoinAndSelect("card.transactions", "transactions")
            .limit(filter.limit).skip(filter.skip)
            .leftJoinAndSelect("transactions.category", "category")
            .leftJoinAndSelect("transactions.business", "business")
            .leftJoinAndSelect("business.businessLogo", "businessLogo")
            .leftJoinAndSelect("card.bankAccount", "bankAccount");
        if (filter.cardId) {
            query.where({id: filter.cardId});
        }
        if (filter.categoryIds) {
            query.andWhere("transactions.category IN (:...categoryIds)", {categoryIds: filter.categoryIds});
        }
        if (filter.threeDaysAgo) {
            const today = moment().format("DD/MM/YYYY");
            const threeDays = moment().subtract(3, 'd').format("DD/MM/YYYY");
            query.andWhere("transactions.transactionDate >= :threeDays", {threeDays: threeDays});
            query.andWhere("transactions.transactionDate <= :today", {today: today});
        }
        if (filter.startDate && !filter.threeDaysAgo) {
            query.andWhere("transactions.transactionDate >= :startDate", {startDate: filter.startDate})
        }
        if (filter.endDate && !filter.threeDaysAgo) {
            query.andWhere("transactions.transactionDate <= :endDate", {endDate: filter.endDate})
        }
        if (filter.order) {
            query.addOrderBy("transactions.transactionDate", filter.order)
        }
        return query.getManyAndCount();
    }

    async getById(cardId): Promise<Card> {
        return Card.findOne(cardId, {relations: ['user', 'transactions', 'bankAccount']});
    }
}