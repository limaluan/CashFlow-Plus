export interface ITransaction {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  created_at: string;
}
