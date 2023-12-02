export interface ITransaction {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  created_at: string;
}

export interface ITransactionsDTO {
  transactions: ITransaction[];
  totalPages: number;
  currentPage: number;
  totalTransactions: number;
}

export interface ILastTransactionsDTO {
  lastCreditTransaction: ITransaction;
  lastDebitTransaction: ITransaction;
}
