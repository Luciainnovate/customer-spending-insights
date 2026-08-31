import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = true;
  saving = false;
  profileForm: any;
  passwordForm: any;
  showPass = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (res) => {
        const user = res.data || res;
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      Swal.fire({ icon: 'warning', title: 'Check fields' });
      return;
    }
    this.saving = true;
    this.auth.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.saving = false;
        Swal.fire({ icon: 'success', title: 'Profile updated!', timer: 1500, showConfirmButton: false });
      },
      error: (err) => {
        this.saving = false;
        Swal.fire({ icon: 'error', title: 'Failed', text: err.error?.message });
      }
    });
  }

  updatePassword() {
    if (this.passwordForm.invalid) {
      Swal.fire({ icon: 'warning', title: 'Fill all password fields' });
      return;
    }
    if (this.passwordForm.value.newPassword!== this.passwordForm.value.confirmNewPassword) {
      Swal.fire({ icon: 'error', title: 'Passwords do not match' });
      return;
    }

    this.auth.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Password changed!' });
        this.passwordForm.reset();
      },
      error: (err) => {
        Swal.fire({ icon: 'error', title: 'Error', text: err.error?.message });
      }
    });
  }
}