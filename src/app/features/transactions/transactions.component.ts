import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatIconModule, MatTableModule, MatChipsModule, MatButtonModule
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  filtered: any[] = [];
  search = '';
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  years = [2024, 2025, 2026];
  months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' },
  ];

  displayedColumns = ['date', 'merchant', 'category', 'type', 'amount'];

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    const params = new HttpParams()
     .set('year', this.selectedYear)
     .set('month', this.selectedMonth);

    this.http.get<any[]>(`${environment.baseUrl}Dashboard/transactions`, { params })
     .subscribe(res => {
        this.transactions = res;
        this.applyFilter();
      });
  }

  applyFilter() {
    this.filtered = this.transactions.filter(t =>
     !this.search || t.merchant.toLowerCase().includes(this.search.toLowerCase()) || t.category.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  get totalIncome() { return this.filtered.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0); }
  get totalSpent() { return this.filtered.filter(t=>t.type==='expense').reduce((s,t)=>s+Math.abs(t.amount),0); }

  getIcon(cat: string) {
    if (cat === 'Groceries') return 'shopping_cart';
    if (cat === 'Transport') return 'directions_car';
    if (cat === 'Entertainment') return 'movie';
    return 'payments';
  }
}