import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: any = null;
  greeting = 'Good evening';
  currentMonth = 'August 2026';
  currentYear = 2026;
  currentMonthNum = 8;

  summary: any = { income: 0, spending: 0, balance: 0, savings: 0, incomeChange: 0, spendingChange: 0, balanceChange: 0, savingsChange: 0 };
  overview: any[] = [];
  categories: any[] = [];
  transactions: any[] = [];
  insight: any = null;
  loading = true;

  constructor(private dashboardService: DashboardService, private auth: AuthService) {}

  ngOnInit() {
    this.setGreeting();
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonthNum = now.getMonth() + 1;
    this.currentMonth = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    const stored = localStorage.getItem('user');
    if (stored) this.user = JSON.parse(stored);

    this.auth.getMe().subscribe({ next: (res:any) => this.user = res.data || res });

    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.dashboardService.getSummary(this.currentYear, this.currentMonthNum).subscribe(res => this.summary = res);
    this.dashboardService.getOverview().subscribe(res => this.overview = res);
    this.dashboardService.getCategories(this.currentYear, this.currentMonthNum).subscribe(res => this.categories = res);
    this.dashboardService.getRecentTransactions().subscribe(res => this.transactions = res);
    this.dashboardService.getInsights().subscribe(res => { this.insight = res; this.loading = false; });
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Good morning';
    else if (hour < 18) this.greeting = 'Good afternoon';
    else this.greeting = 'Good evening';
  }
}