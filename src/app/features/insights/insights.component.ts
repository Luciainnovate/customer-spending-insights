import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  insights: any[] = [];
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() { this.load(); }

  load() {
    // reuse your insights endpoint, now returns array
    this.dashboardService.getInsights(this.selectedYear, this.selectedMonth)
     .subscribe((res:any) => {
        this.insights = Array.isArray(res)? res : [res];
      });
  }

  get currentLabel() {
    return `${this.months.find(m=>m.value===this.selectedMonth)?.name} ${this.selectedYear}`;
  }
}