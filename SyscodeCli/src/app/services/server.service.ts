import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';

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
  createStudent(name: string, email: string): Observable<Student[] | string> {
    try {
      return this.http.post<Student[]>(this.profileServerEndpoint+'/create', {name, email});
    } catch (error) {
      console.error('Error creating student: ', error);
      return of('Failed to create student.');
    }  
  }

  // Update student in profile service
  updateStudent(student: Student): Observable<Student | string> {
    try {
      return this.http.put<Student>(this.profileServerEndpoint+'/update/'+student.id, {name: student.name, email: student.email});
    } catch (error) {
      console.error('Student update error: ', error);
      return of('Failed to update student.');
    }  
  }

  // Delete student from profile service
  deleteStudent(id: string): Observable<string> {
    try {
      return this.http.delete<string>(this.profileServerEndpoint+'/delete/'+id);
    } catch (error) {
      console.error('Student delete error: ', error);
      return of('Failed to delete student.');
    }  
  }

  // Get address from address service
  async getAddress(): Promise<Address | string> {
    try {
      return await firstValueFrom(this.http.get<Address>(this.addressServerEndpoint + '/address'));
    } catch (error) {
      console.error('Error fetching address: ', error);
      return 'Failed to fetch address.';
    }  
  }
}
