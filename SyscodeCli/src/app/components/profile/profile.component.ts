import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, AfterViewInit {
  studentForm!: FormGroup;
  students = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serverSrv: ServerService, 
    private fb: FormBuilder,
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
  
  ngAfterViewInit() {
    this.students.paginator = this.paginator;
    this.students.sort = this.sort;
  }

  // Load students from profile service
  async loadStudents() {
    const students = await this.serverSrv.getStudents();
    if (Array.isArray(students)) {
      this.students.data = students;
      this.students.paginator = this.paginator;
      this.students.sort = this.sort;
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
      }
    });
  }

  // Delete a student from profile service
  deleteStudent(id: string) {
    this.serverSrv.deleteStudent(id).subscribe((response) => {
      if (response !== 'Failed to delete student.') {
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
}
