import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDTO } from 'src/@types/User';

type ILoginDTO = Pick<IUserDTO, 'email' | 'password'>;

type IRegisterDTO = Pick<IUserDTO, 'name' | 'email' | 'password'>;

interface ILoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(data: ILoginDTO): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.apiUrl + 'login', data);
  }

  register(data: IRegisterDTO) {
    return this.http.post<Partial<IUserDTO>>(this.apiUrl + 'register', data);
  }
}
