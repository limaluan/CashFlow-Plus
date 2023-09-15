import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    if (!this.auth.getToken()) this.router.navigate(['']);

    this.titleService.setTitle('Dashboard | Cashflow');
  }
}
