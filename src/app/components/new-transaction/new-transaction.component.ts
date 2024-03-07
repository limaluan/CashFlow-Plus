import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent {
  constructor(
    public dialogRef: MatDialogRef<NewTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private transactionsService: TransactionsService,
    private toastr: ToastrService
  ) {}

  transactionForm!: FormGroup;

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  type!: 'credit' | 'debit';

  get description() {
    return this.transactionForm.get('description')!;
  }

  get amount() {
    return this.transactionForm.get('amount')!;
  }

  get category() {
    return this.transactionForm.get('category')!;
  }

  changeType(type: 'credit' | 'debit') {
    this.type = type;
  }

  onConfirm() {
    this.transactionsService
      .createTransaction({
        description: this.description.value,
        amount: Number(this.amount.value),
        category: this.category.value,
        type: this.type,
      })
      .subscribe(
        (response) => {
          this.toastr.success('Transação adicionada.');
          this.transactionsService.announceTransactionAdded();
          this.dialogRef.close();
        },
        (error) => this.toastr.error(error.error.message)
      );
  }
}
