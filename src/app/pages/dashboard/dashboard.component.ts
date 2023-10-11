import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUser, ITransaction, IUserBalance } from 'src/@types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private userService: UserService, private titleService: Title) {}

  user: IUser = {} as IUser;
  userTransactions: ITransaction[] = [] as ITransaction[];
  userBalance: IUserBalance = {} as IUserBalance;

  lastDebitTransaction: ITransaction = {} as ITransaction;

  lastCreditTransaction: ITransaction = {} as ITransaction;

  search: string = '';

  ngOnInit() {
    this.titleService.setTitle('Dashboard | Cashflow');

    this.userService.user.subscribe((user) => (this.user = user));
    this.userService.userTransactions.subscribe((transactions) => {
      this.userTransactions = transactions;

      this.lastDebitTransaction = transactions.reduce(
        (prevObj, currentObj) => {
          if (currentObj.type === 'debit') {
            return currentObj.id > prevObj.id
              ? {
                  ...currentObj,
                  created_at: this.formatDate(currentObj.created_at),
                }
              : prevObj;
          } else return prevObj;
        },
        { ...transactions[0], id: -1 }
      );

      this.lastCreditTransaction = transactions.reduce(
        (prevObj, currentObj) => {
          if (currentObj.type === 'credit') {
            return currentObj.id > prevObj.id
              ? {
                  ...currentObj,
                  created_at: this.formatDate(currentObj.created_at),
                }
              : prevObj;
          } else return prevObj;
        },
        { ...transactions[0], id: -1 }
      );
    });
    this.userService.userBalance.subscribe(
      (balanceData) => (this.userBalance = balanceData)
    );
  }

  filterTransactionsByName() {
    this.userService.userTransactions.subscribe(
      (transactions) =>
        (this.userTransactions = transactions.filter(
          (transaction) =>
            this.search === '' ||
            transaction.description
              .toLowerCase()
              .includes(this.search.toLowerCase())
        ))
    );
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);

    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} de ${month}`;
  }
}
