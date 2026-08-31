import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: any = null;
  initial = 'U';

  showMenu = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // try from localStorage first (fast)
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.setUser(parsed);
      } catch {}
    }

    // then fetch real profile
    this.auth.getMe().subscribe({
      next: (res: any) => {
        const u = res.data || res;
        this.setUser(u);
      },
      error: () => {}
    });
  }

  setUser(u: any) {
    this.user = u;
    const name = u.firstName || u.first_name || u.email || 'User';
    this.initial = name.charAt(0).toUpperCase();
  }

  toggleMenu() {
    this.showMenu =!this.showMenu;
  }

  goProfile() {
    this.showMenu = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}