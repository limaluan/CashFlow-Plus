import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private titleService: Title) {}

  email: string = '';
  password: string = '';

  isLogin: boolean = true;

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
    this.titleService.setTitle('Login - CashFlow');
  }
}
