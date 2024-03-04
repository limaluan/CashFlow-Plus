import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { IUser } from 'src/@types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private router: Router) {}

  get user(): Observable<IUser> {
    return this.http.get<IUser>(this.apiUrl + 'user').pipe(
      catchError((error) => {
        console.error('Erro ao obter usuário', error);
        return this.router.navigate(['']);
      })
    ) as Observable<IUser>;
  }
}
