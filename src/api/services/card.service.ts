import {Container, Service} from "typedi";
import {Card} from "../../entities/card.entity";
import {CardDto} from "../dto/card.dto";
import {BankAccountService} from "./bank-account.service";

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

    async get(): Promise<Card[]> {
        return Card.find({relations: ['user', 'transactions', 'bankAccount']});
    }
}