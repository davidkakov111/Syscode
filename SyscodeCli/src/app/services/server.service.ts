import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';

export interface Student { id: string, name: string, email: string, isEditing?: boolean };

export interface Address {id: string, address: string};

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {}

  profileServerEndpoint: string = "http://localhost:3000";
  addressServerEndpoint: string = "http://localhost:3001";

  // Read all students from profile service
  async getStudents(): Promise<Student[] | string> {
    try {
      return await firstValueFrom(this.http.get<Student[]>(this.profileServerEndpoint + '/read'));
    } catch (error) {
      console.error('Error fetching students: ', error);
      return 'Failed to fetch students.';
    }  
  }

  // Create student in profile service
  createStudent(name: string, email: string): Observable < Student | string > {
    return this.http.post<Student>(this.profileServerEndpoint + '/create', {name, email}).pipe(
      catchError((error: any) => {
        console.error('Error creating student: ', error);

        if (error.status === 400) {
          return of("The email doesn't seem valid");
        } else if (error.name === 'HttpErrorResponse' && error.error instanceof TypeError && error.error.message === 'Failed to fetch') {
          return of('Failed to connect to the server.');
        } else {
          return of('Failed to create student.');
        }
      })
    );
  }

  // Update student in profile service
  updateStudent(student: Student): Observable<Student | string> {
    return this.http.put<Student>(this.profileServerEndpoint + '/update/'+student.id, {name: student.name, email: student.email}).pipe(
      catchError((error: any) => {
        console.error('Student update error: ', error);

        if (error.status === 400) {
          return of("The email doesn't seem valid");
        } else if (error.name === 'HttpErrorResponse' && error.error instanceof TypeError && error.error.message === 'Failed to fetch') {
          return of('Failed to connect to the server.');
        } else {
          return of('Failed to update student.');
        }
      })
    );
  }

  // Delete student from profile service
  deleteStudent(id: string): Observable<string> {
    return this.http.delete<string>(this.profileServerEndpoint + '/delete/'+id).pipe(
      catchError((error: any) => {
        console.error('Student delete error: ', error);

        if (error.name === 'HttpErrorResponse' && error.error instanceof TypeError && error.error.message === 'Failed to fetch') {
          return of('Failed to connect to the server.');
        } else {
          return of('Failed to delete student.');
        }
      })
    );
  }

  // Get address from address service
  getAddress(name: string, pass: string): Observable<Address | string> {
    // Create the Basic Authentication header
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(`${name}:${pass}`)});
    return this.http.get<Address>(this.addressServerEndpoint + '/address', { headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching address: ', error);

        if (error.status === 401) {
          return of("Authentication failed");
        } else if (error.name === 'HttpErrorResponse' && error.error instanceof TypeError && error.error.message === 'Failed to fetch') {
          return of('Failed to connect to the server.');
        } else {
          return of('Failed to fetch address.');
        }
      })
    );
  }
}
