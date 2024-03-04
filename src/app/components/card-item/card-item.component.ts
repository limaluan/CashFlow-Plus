import { Component, Input } from '@angular/core';
import { formatDate } from 'src/utils/formatDate';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() id!: string;
  @Input() type!: 'debit' | 'credit';
  @Input() amount!: number;
  @Input() description!: string;
  @Input() category!: string;
  @Input() createdAt!: string;

  ngOnInit() {
    this.createdAt = formatDate(this.createdAt);
  }
}
