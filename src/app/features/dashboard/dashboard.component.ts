import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: any = null;
  greeting = 'Good evening';

  selectedYear = 2026;
  selectedMonth = 8;
  years = [2024, 2025, 2026];
  months = [
    { value: 1, name: 'January' }, { value: 2, name: 'February' },
    { value: 3, name: 'March' }, { value: 4, name: 'April' },
    { value: 5, name: 'May' }, { value: 6, name: 'June' },
    { value: 7, name: 'July' }, { value: 8, name: 'August' },
    { value: 9, name: 'September' }, { value: 10, name: 'October' },
    { value: 11, name: 'November' }, { value: 12, name: 'December' },
  ];

  summary: any = { income: 0, spending: 0, balance: 0, savings: 0, incomeChange: 0, spendingChange: 0, balanceChange: 0, savingsChange: 0 };
  overview: any[] = [];
  categories: any[] = [];
  transactions: any[] = [];
  insight: any = null;

  constructor(private dashboardService: DashboardService, private auth: AuthService) {}

  ngOnInit() {
    const now = new Date();
    this.selectedYear = now.getFullYear();
    this.selectedMonth = now.getMonth() + 1;
    this.setGreeting();
    this.loadAll();
     const stored = localStorage.getItem('user');
    if (stored) this.user = JSON.parse(stored);

    this.auth.getMe().subscribe({ next: (res:any) => this.user = res.data || res });
  }

  onPeriodChange() {
    this.loadAll();
  }

  loadAll() {
    this.dashboardService.getSummary(this.selectedYear, this.selectedMonth).subscribe(r => this.summary = r);
    this.dashboardService.getOverview(this.selectedYear, this.selectedMonth).subscribe(r => this.overview = r);
    this.dashboardService.getCategories(this.selectedYear, this.selectedMonth).subscribe(r => this.categories = r);
    this.dashboardService.getRecentTransactions(this.selectedYear, this.selectedMonth).subscribe(r => this.transactions = r);
    this.dashboardService.getInsights(this.selectedYear, this.selectedMonth).subscribe(r => this.insight = r);
  }

  setGreeting() {
    const h = new Date().getHours();
    if (h < 12) this.greeting = 'Good morning';
    else if (h < 18) this.greeting = 'Good afternoon';
    else this.greeting = 'Good evening';
  }

  get currentMonthLabel() {
    const m = this.months.find(x => x.value === this.selectedMonth)?.name;
    return `${m} ${this.selectedYear}`;
  }

    // ADD THESE
  get maxOverviewValue(): number {
    if (!this.overview.length) return 30000;
    const max = Math.max(...this.overview.flatMap(o => [o.income, o.spending]));
    return Math.ceil(max / 5000) * 5000 || 30000;
  }

  getChartPoints(type: 'income' | 'spending'): string {
    if (!this.overview.length) return '';
    const max = this.maxOverviewValue;
    const count = this.overview.length;
    const stepX = 600 / (count - 1 || 1);
    
    return this.overview.map((item, i) => {
      const value = type === 'income' ? item.income : item.spending;
      const x = i * stepX;
      // invert Y: 0 at top, 220 at bottom
      const y = 220 - (value / max) * 200 - 10;
      return `${x},${y}`;
    }).join(' ');
  }
}