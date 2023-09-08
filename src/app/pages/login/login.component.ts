import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IInputEventProps } from 'src/app/components/input/input.component';

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

  handleChange(e: IInputEventProps) {
    if (e.inputName === 'email') {
      this.email = e.value;
    } else {
      this.password = e.value;
    }
  }

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
    this.titleService.setTitle('Login - CashFlow');
  }
}
