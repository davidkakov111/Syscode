import { Component, OnInit } from '@angular/core';
import { Address, ServerService } from '../../services/server.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ]
})
export class AddressComponent {
  addressForm!: FormGroup;
  address: Address | null = null;
  isUpdated: boolean = false;

  constructor(
    private serverSrv: ServerService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    // Initialize the form for basic auth credentials
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Get a random address from address service
  async loadAddress() {
    if (this.addressForm.invalid) return;
    const { name, password } = this.addressForm.value;

    this.serverSrv.getAddress(name, password).subscribe((address) => {
      if (address && typeof address === 'object') {
        this.address = address;

        this.isUpdated = false; // Reset animation trigger
        setTimeout(() => this.isUpdated = true, 50);
      } else {
        this.addressForm.reset();
        console.error(`Failed to load address: ${address}`);

        if (address === 'Authentication failed') {
          this.openConfirmDialog('Invalid username or password');
        } else if (address === 'Failed to connect to the server.') {
          this.openConfirmDialog('Failed to connect to the Address server');
        } else {
          this.openConfirmDialog('Failed to load address');
        }
      }
    });
  }

  // Open confirmation dialog with a message
  openConfirmDialog(message: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      data: { message }
    });
  }
}
