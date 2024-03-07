import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  constructor() {}

  @Output() switchPage = new EventEmitter<number>();

  handleSwitchPage(pageNumber: number) {
    this.switchPage.emit(pageNumber);
  }

  @Input() pageNumber!: number;
  @Input() totalPages!: number;

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
      this.handleSwitchPage(0);
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
      else if (pages.sort()[0] - 1 > 0) {
        pages.push(pages[0] - 1);
      }
    }

    return pages.sort();
  }
}
