import { Component, EventEmitter, Output } from '@angular/core';
import { ITransactionsDTO, IUser } from 'src/@types';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  constructor(
    private userService: UserService,
    private transactionService: TransactionsService
  ) {}

  @Output() switchPage = new EventEmitter<number>();

  handleSwitchPage(pageNumber: number) {
    this.switchPage.emit(pageNumber);
  }

  user: IUser = {} as IUser;
  userTransactions: ITransactionsDTO = {} as ITransactionsDTO;
  pageNumber!: number;
  totalPages!: number;
  isLastPages: boolean = false;

  ngOnInit() {
    this.userService.user.subscribe((user) => (this.user = user));
    this.transactionService.getUserTransactions().subscribe((data) => {
      this.userTransactions = data;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.totalPages = data.totalPages;
    });
  }

  handlePreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.handleSwitchPage(this.pageNumber - 1);
    }
  }

  handleNextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber += 1;
      this.handleSwitchPage(this.pageNumber - 1);
    }
  }

  handleSelectPage(pageNumber: number) {
    if (pageNumber < 1) {
      this.pageNumber = 1;
    } else if (pageNumber != this.pageNumber) {
      this.pageNumber = pageNumber;
      this.handleSwitchPage(this.pageNumber - 1);
    }
  }

  pages(): number[] {
    const arrayLength: number = 5;

    let pages = new Array();

    for (
      let page = this.pageNumber;
      page < this.pageNumber + arrayLength;
      page++
    ) {
      if (page <= this.totalPages) pages.push(page);
      else {
        console.log(pages.sort()[0]);
        pages.push(pages[0] - 1);
      }
    }

    return pages.sort();

    return Array.from({ length: arrayLength }, (_, index) => index + 1);
  }
}
