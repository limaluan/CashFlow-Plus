import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  ITransaction,
  ITransactionsDTO,
  IUser,
  IUserBalance,
} from 'src/@types';
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
  userTransactions: ITransactionsDTO = {} as ITransactionsDTO;
  userBalance: IUserBalance = {} as IUserBalance;

  pageNumber!: number;
  totalPages!: number;
  searchMode: boolean = false;

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
          createdAt: this.formatDate(
            lastTransactions.lastDebitTransaction.createdAt
          ),
        };
        this.lastCreditTransaction = {
          ...lastTransactions.lastCreditTransaction,
          createdAt: this.formatDate(
            lastTransactions.lastCreditTransaction.createdAt
          ),
        };
      }
    );
    this.refreshTransactions();
  }

  refreshTransactions(
    pageNumber: number = 0,
  ): any {
    if (this.searchMode) {
      return this.transactionService
        .getUserTransactions(pageNumber, this.search)
        .subscribe((data) => {
          this.userTransactions = data;
          this.totalPages = data.totalPages;
          this.pageNumber = data.pageable.pageNumber;
        });
    }

    this.transactionService
      .getUserTransactions(pageNumber)
      .subscribe((data) => {
        this.userTransactions = data;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
      });

    this.transactionService.userBalance.subscribe(
      (balanceData) => (this.userBalance = balanceData)
    );
  }

  createTransaction() {
    this.dialog.open(NewTransactionComponent);
  }

  filterTransactionsByName() {
    this.searchMode = true;
    this.search == '' && (this.searchMode = false);

    this.transactionService
      .getUserTransactions(0, this.search)
      .subscribe((data) => {
        this.userTransactions = data;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
      });
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
