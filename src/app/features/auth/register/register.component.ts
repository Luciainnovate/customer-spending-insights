import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  show = false;
  loading = false;
  error = '';
  success = '';
  form;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fill all fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    // roleId NOT in form, hardcoded to 2
    const payload = {
      ...this.form.value,
      roleId: 2
    };

    console.log('Sending:', payload);
    // Will log:
    // {
    //   "firstName": "Innovate",
    //   "lastName": "Mabasa",
    //   "email": "Luciainnovate@admin.com",
    //   "password": "Password123!",
    //   "ConfirmPassword":"Password123!",
    //   "roleId": 2
    // }

    this.auth.register(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.success = res.message || 'Account created! Redirecting...';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || JSON.stringify(err.error);
        console.error(err);
      }
    });
  }
}