import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // or 'token'
    const user = localStorage.getItem('user'); // optional, if you want to check for user data as well
    console.log('Auth Guard: token:', token);
    console.log('Auth Guard: user:', user);
    debugger
  if (token) {
    return true; // logged in -> allow dashboard
  } else {
    router.navigate(['/auth/login']);
    return false; // not logged in -> go to login
  }
};