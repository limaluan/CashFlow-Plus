import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUserBalance } from 'src/@types';
import { ILastTransactionsDTO, ITransaction, ITransactionsDTO } from 'src/@types/Transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = 'http://localhost:8080/user/transactions';
  private transactionAddedSource = new Subject<void>();

  transactionAddedSource$ = this.transactionAddedSource.asObservable();

  announceTransactionAdded() {
    this.transactionAddedSource.next();
  }

  constructor(private http: HttpClient) {}

  getUserTransactions(pageNumber: number = 0, transactionDescription?: string): Observable<ITransactionsDTO> {
    if (transactionDescription) {
      return this.http.get(this.apiUrl + `?page=${pageNumber}` +
      `&transactionDescription=${transactionDescription}`) as Observable<ITransactionsDTO>;
    }
    return this.http.get(this.apiUrl + `?page=${pageNumber}`) as Observable<ITransactionsDTO>;
  }

  get userLastsTransactions(): Observable<ILastTransactionsDTO> {
    return this.http.get(
      this.apiUrl + '/lastTransactions'
    ) as Observable<ILastTransactionsDTO>;
  }

  get userBalance(): Observable<IUserBalance> {
    return this.http.get(this.apiUrl + '/balance') as Observable<IUserBalance>;
  }

  createTransaction(data: Partial<ITransaction>): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
