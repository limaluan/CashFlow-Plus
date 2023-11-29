import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUserBalance } from 'src/@types';
import { ITransaction } from 'src/@types/Transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = 'http://localhost:3000/user/transactions/';
  private transactionAddedSource = new Subject<void>();

  transactionAddedSource$ = this.transactionAddedSource.asObservable();

  announceTransactionAdded() {
    this.transactionAddedSource.next();
  }

  constructor(private http: HttpClient) {}

  get userTransactions(): Observable<ITransaction[]> {
    return this.http.get(this.apiUrl) as Observable<ITransaction[]>;
  }

  get userBalance(): Observable<IUserBalance> {
    return this.http.get(this.apiUrl + 'balance') as Observable<IUserBalance>;
  }

  createTransaction(data: Partial<ITransaction>): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
