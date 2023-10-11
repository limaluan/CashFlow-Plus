import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { IUserBalance } from 'src/@types';
import { ITransaction } from 'src/@types/Transactions';
import { IUser } from 'src/@types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {}

  get user(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl + 'user').pipe(
      catchError((error) => {
        console.error('Erro ao obter usuário', error);
        return this.router.navigate(['']);
      })
    ) as Observable<IUser>;
  }

  get userTransactions(): Observable<ITransaction[]> {
    return this.http.get(this.apiUrl + 'user/transactions') as Observable<
      ITransaction[]
    >;
  }

  get userBalance(): Observable<IUserBalance> {
    return this.http.get(
      this.apiUrl + 'user/transactions/balance'
    ) as Observable<IUserBalance>;
  }
}
