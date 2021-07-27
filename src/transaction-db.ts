export interface Transaction {
    id: string;
    asset: string;
    amount: number;
    destinationAddress: string;
    userId: string;
}

export class TransactionDb {
    private static transactions: Transaction[] = [];

    static saveTransaction(transaction: Transaction) {
        TransactionDb.transactions.push(transaction);
    }

    static getTransactionById(userId: string, id: string) {
        return TransactionDb.transactions.find(x => x.id === id && x.userId === userId);
    }
}
