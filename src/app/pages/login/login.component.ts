import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  loginForm!: FormGroup;

  isLogin: boolean = true;

  ngOnInit() {
    this.titleService.setTitle('Login | CashFlow');

    this.userService.user.subscribe(
      (user) => user.id && this.router.navigate(['dashboard'])
    );

    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
  }

  get name() {
    return this.loginForm.get('name')!;
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
      this.authService
        .login({
          email: this.email.value,
          password: this.password.value,
        })
        .subscribe(
          (userResponse) => {
            this.authService.setToken(userResponse.token);
            this.router.navigate(['/dashboard']);
          },
          (_error) => {
            this.toastr.error('Email ou senha inválida');
          }
        );
    } else {
      if (this.name.invalid || this.name.value.length < 2) {
        this.toastr.error(
          'Por favor, verifique e tente novamente.',
          'Nome inválido'
        );

        return;
      } else if (this.email.invalid) {
        this.toastr.error(
          'Por favor, verifique e tente novamente.',
          'Email inválido'
        );

        return;
      } else if (this.password.invalid) {
        this.toastr.error(
          'Por favor, verifique e tente novamente.',
          'Senha inválida'
        );

        return;
      } else if (this.password.value.length < 3) {
        this.toastr.error(
          'Por favor, verifique e tente novamente.',
          'Senha deve ter possuir menos 4 caracteres'
        );

        return;
      } else if (this.password.value !== this.confirmPassword.value) {
        this.toastr.error(
          'Por favor, verifique e tente novamente.',
          'Senha e confirmação de senha não coincidem.'
        );

        return;
      }

      this.authService
        .register({
          name: this.name.value,
          email: this.email.value,
          password: this.password.value,
        })
        .subscribe(
          (_response) => {
            this.isLogin = true;
            this.loginForm.reset();
            this.toastr.success('Conta criada com sucesso!');
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
    }
  }
}
