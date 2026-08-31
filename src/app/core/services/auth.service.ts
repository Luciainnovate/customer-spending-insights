import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl; // https://localhost:7299/api/

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}Auth/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}Auth/register`, data);
  }

  getMe() {
    return this.http.get(`${this.baseUrl}Auth/me`);
  }

  // --- NEW METHODS FOR PROFILE PAGE ---

  getProfile() {
    return this.http.get<any>(`${this.baseUrl}Auth/me`);
  }

  updateProfile(data: any) {
    return this.http.put<any>(`${this.baseUrl}Auth/me`, data);
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.baseUrl}Auth/change-password`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}