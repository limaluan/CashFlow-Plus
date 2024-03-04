export interface ITransaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  createdAt: string;
}

export interface ITransactionsDTO {
  content: ITransaction[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
}

export interface ILastTransactionsDTO {
  lastCreditTransaction: ITransaction;
  lastDebitTransaction: ITransaction;
}
