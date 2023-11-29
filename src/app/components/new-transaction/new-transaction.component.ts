import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    if (this.description.value.length < 3) {
      this.toastr.error(
        'Por favor, insira uma descrição maior.',
        'Descrição inválida'
      );
    } else if (this.amount.value <= 0) {
      this.toastr.error('Insira um valor maior do que 0', 'Valor inválido');
    } else if (this.category.value.length <= 2) {
      this.toastr.error(
        'A categoria deve possuir mais que 2 letras.',
        'Categoria inválida'
      );
    } else if (this.type != 'credit' && this.type != 'debit') {
      this.toastr.error(
        'Por favor, selecione o tipo de transação.',
        'Tipo de transação inválido'
      );
    }

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
        (error) => console.log(error)
      );
  }
}
