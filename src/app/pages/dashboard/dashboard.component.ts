import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IUser, ITransaction, IUserBalance } from 'src/@types';
import { NewTransactionComponent } from 'src/app/components/new-transaction/new-transaction.component';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private transactionAddedSubscription: Subscription;

  constructor(
    private transactionService: TransactionsService,
    private userService: UserService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.transactionAddedSubscription =
      this.transactionService.transactionAddedSource$.subscribe(() => {
        this.refreshTransactions();
      });
  }

  user: IUser = {} as IUser;
  userTransactions: ITransaction[] = [] as ITransaction[];
  userBalance: IUserBalance = {} as IUserBalance;

  lastDebitTransaction: ITransaction = {} as ITransaction;
  lastCreditTransaction: ITransaction = {} as ITransaction;

  search: string = '';

  ngOnInit() {
    this.titleService.setTitle('Dashboard | Cashflow');

    this.userService.user.subscribe((user) => (this.user = user));
    this.transactionService.userLastsTransactions.subscribe(
      (lastTransactions) => {
        this.lastDebitTransaction = {
          ...lastTransactions.lastDebitTransaction,
          created_at: this.formatDate(
            lastTransactions.lastDebitTransaction.created_at
          ),
        };
        this.lastCreditTransaction = {
          ...lastTransactions.lastCreditTransaction,
          created_at: this.formatDate(
            lastTransactions.lastCreditTransaction.created_at
          ),
        };
      }
    );
    this.refreshTransactions();
  }

  refreshTransactions() {
    console.log('Atualizou');
    this.transactionService.userTransactions.subscribe((data) => {
      this.userTransactions = data.transactions;
    });

    this.transactionService.userBalance.subscribe(
      (balanceData) => (this.userBalance = balanceData)
    );
  }

  createTransaction() {
    this.dialog.open(NewTransactionComponent);
  }

  filterTransactionsByName() {
    this.transactionService.userTransactions.subscribe(
      (data) =>
        (this.userTransactions = data.transactions.filter(
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
