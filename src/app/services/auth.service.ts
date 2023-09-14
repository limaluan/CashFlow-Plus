import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/types/User';

type ILoginData = Pick<IUser, 'email' | 'password'>;

interface ILoginResponse {
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(data: ILoginData): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.apiUrl + 'login', data);
  }

  register(data: ILoginData) {
    console.log(data);
  }
}
