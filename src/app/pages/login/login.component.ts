import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private titleService: Title, private authService: AuthService) {}

  loginForm!: FormGroup;

  isLogin: boolean = true;

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
    this.titleService.setTitle('Login - CashFlow');

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get confirmPassword() {
    return this.loginForm.get('confirmPassword')!;
  }

  submit() {
    if (this.isLogin) {
      console.log(
        this.authService
          .login({
            email: this.email.value,
            password: this.password.value,
          })
          .subscribe((userResponse) => {
            this.authService.setToken(userResponse.token)
          })
      );
    } else {
      this.authService.register({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }
}
