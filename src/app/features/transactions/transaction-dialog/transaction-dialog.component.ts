import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService,private http: HttpClient, private dialogRef: MatDialogRef<TransactionDialogComponent>) {
    this.form = this.fb.group({
      type: ['expense', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      merchant: ['', Validators.required],
      date: [new Date(), Validators.required],
      description: ['']
    });
  }

  save() {
  const payload = {...this.form.value, date: this.form.value.date.toISOString() };
  this.loading = true;
  this.dashboardService.addTransaction(payload).subscribe({
    next: (res) => this.dialogRef.close(res),
    error: () => this.loading = false
  });
}
  close() { this.dialogRef.close(); }
}