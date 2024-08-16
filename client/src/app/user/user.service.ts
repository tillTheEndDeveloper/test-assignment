import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { UserDto } from './user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/register`, user).pipe(
      catchError((error) => {
        console.error('Error occurred during registration:', error);
        throw error;
      })
    );
  }
}
