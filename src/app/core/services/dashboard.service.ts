import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = environment.baseUrl + 'Dashboard';

  constructor(private http: HttpClient) {}

  // builds ?year=2026&month=8
  private buildParams(year?: number, month?: number) {
    let params = new HttpParams();
    if (year) params = params.set('year', year.toString());
    if (month) params = params.set('month', month.toString());
    return params;
  }

  getSummary(year: number, month: number) {
    return this.http.get<any>(`${this.base}/summary`, { params: this.buildParams(year, month) });
  }

  getOverview(year: number, month: number) {
    return this.http.get<any[]>(`${this.base}/overview`, { params: this.buildParams(year, month) });
  }

  getCategories(year: number, month: number) {
    return this.http.get<any[]>(`${this.base}/categories`, { params: this.buildParams(year, month) });
  }

  getInsights(year: number, month: number) {
    return this.http.get<any>(`${this.base}/insights`, { params: this.buildParams(year, month) });
  }

  getRecentTransactions(year: number, month: number) {
    return this.http.get<any[]>(`${this.base}/transactions`, { params: this.buildParams(year, month) });
  }
  getBudgets(year: number, month: number) {
  return this.http.get<any[]>(`${this.base}/budgets`, { params: this.buildParams(year, month) });
}
}