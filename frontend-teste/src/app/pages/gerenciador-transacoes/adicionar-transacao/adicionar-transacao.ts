import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-transacao',
  standalone: false,
  templateUrl: './adicionar-transacao.html',
  styleUrl: './adicionar-transacao.scss',
})
export class AdicionarTransacao {
  transactionType = 'expense'
  addExpenseForm!: FormGroup
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.addExpenseForm = this.fb.group({
      description: ['', [Validators.required]],
      value: ['', [Validators.required]],
      date: [this.today, [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  setExpense() {
    this.transactionType = 'expense'
  }

  setIncome() {
    this.transactionType = 'income'
  }
}
