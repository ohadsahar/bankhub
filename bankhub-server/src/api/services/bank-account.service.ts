import {Service} from "typedi";
import {BankAccountDto} from "../dto/bank-account.dto";
import {BankAccount} from "../../entities/bank-account.entity";

@Service()
export class BankAccountService {

    async create(bankAccountData: BankAccountDto): Promise<BankAccount> {
        const bankAccountEntity = new BankAccount();
        bankAccountEntity.branch = bankAccountData.branch;
        bankAccountEntity.accountNumber = bankAccountData.accountNumber;
        bankAccountEntity.bankName = bankAccountData.bankName;
        return BankAccount.save(bankAccountEntity);
    }

    async update(bankAccountData, cardId: number): Promise<BankAccount> {
        const existsBankAccount = await BankAccount.findOne({id: cardId});
        if (!existsBankAccount) {
            return;
        }
        return BankAccount.save({...existsBankAccount, ...bankAccountData});
    }
}