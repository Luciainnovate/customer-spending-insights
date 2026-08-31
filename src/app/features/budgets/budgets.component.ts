import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent implements OnInit {
  budgets: any[] = [];
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

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    const params = new HttpParams()
     .set('year', this.selectedYear)
     .set('month', this.selectedMonth);

    this.http.get<any[]>(`${environment.baseUrl}Budgets`, { params })
     .subscribe(res => this.budgets = res);
  }

  get currentLabel() {
    return `${this.months.find(m=>m.value===this.selectedMonth)?.name} ${this.selectedYear}`;
  }
}