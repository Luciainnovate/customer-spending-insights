import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private base = environment.baseUrl + 'Dashboard';

  constructor(private http: HttpClient) {}

  getSummary(year?: number, month?: number) {
    let params = new HttpParams();
    if(year) params = params.set('year', year);
    if(month) params = params.set('month', month);
    return this.http.get<any>(`${this.base}/summary`, { params });
  }

  getOverview() {
    return this.http.get<any[]>(`${this.base}/overview`);
  }

  getCategories(year?: number, month?: number) {
    let params = new HttpParams();
    if(year) params = params.set('year', year);
    if(month) params = params.set('month', month);
    return this.http.get<any[]>(`${this.base}/categories`, { params });
  }

  getInsights() {
    return this.http.get<any>(`${this.base}/insights`);
  }

  getRecentTransactions(take = 5) {
    return this.http.get<any[]>(`${environment.baseUrl}Transactions/recent?take=${take}`);
  }
}