import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  sanitizedMessage!: SafeHtml;

  constructor( 
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private sanitizer: DomSanitizer 
  ) {
    this.sanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(data.message);
  }

  // Close dialog and return a result when OK is clicked
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}