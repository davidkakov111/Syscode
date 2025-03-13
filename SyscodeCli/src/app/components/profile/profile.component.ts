import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService, Student } from '../../services/server.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  studentForm!: FormGroup;
  students = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serverSrv: ServerService, 
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    // Initialize the form to create student
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    // On init load the students
    this.loadStudents();
  }

  // Load students from profile service
  async loadStudents() {
    const students = await this.serverSrv.getStudents();
    if (Array.isArray(students)) {
      this.students.data = students;
      
      setTimeout(() => {
        this.students.paginator = this.paginator;
        this.students.sort = this.sort;
      });
    } else {
      console.error(`Failed to load students: ${students}`);
    }
  }

  // Create a new student in profile service
  createStudent() {
    if (this.studentForm.invalid) return;
    const { name, email } = this.studentForm.value;

    this.serverSrv.createStudent(name, email).subscribe((student) => {
      if (student && typeof student === 'object' && !Array.isArray(student)) {
        this.students.data = [...this.students.data, student];
        this.studentForm.reset();
        this.students.paginator = this.paginator;
        this.students.sort = this.sort;
      } else {
        console.error(`Failed to create student: ${JSON.stringify(student)}`);
        if (student === "The email doesn't seem valid") {
          this.openConfirmDialog(student);
        } else if (student === "Failed to connect to the server.") {
          this.openConfirmDialog("Failed to connect to the Profile server.");
        } else {
          this.openConfirmDialog('Failed to create student');
        }
      }
    });
  }

  // Update a student in profile service
  updateStudent(student: Student) {
    this.serverSrv.updateStudent(student).subscribe((updatedStudent) => {
      if (updatedStudent && typeof updatedStudent === 'object' && !Array.isArray(updatedStudent)) {
        this.students.data = this.students.data.map((s) =>
          s.id === updatedStudent.id ? { ...s, ...updatedStudent, isEditing: false } : s
        );
        this.students.paginator = this.paginator;
        this.students.sort = this.sort;
      } else {
        console.error(`Failed to update student: ${JSON.stringify(updatedStudent)}`);

        if (updatedStudent === "The email doesn't seem valid") {
          this.openConfirmDialog(updatedStudent);
        } else if (updatedStudent === "Failed to connect to the server.") {
          this.openConfirmDialog("Failed to connect to the Profile server.");
        } else {
          this.openConfirmDialog('Failed to update student');
        }
      }
    });
  }

  // Delete a student from profile service
  deleteStudent(id: string) {
    this.serverSrv.deleteStudent(id).subscribe((response) => {
      if (response === 'Failed to connect to the server.') {
        this.openConfirmDialog("Failed to connect to the Profile server.");
      } else if (response === 'Failed to delete student.') {
        this.openConfirmDialog(response);
      } else {
        this.students.data = this.students.data.filter((s) => s.id !== id);
        this.students.paginator = this.paginator;
        this.students.sort = this.sort;
      }
    });
  }

  // Enable editing for a student
  editStudent(student: Student) {
    student.isEditing = true;
  }

  // Open confirmation dialog with a message
  openConfirmDialog(message: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      data: { message }
    });
  }
}
