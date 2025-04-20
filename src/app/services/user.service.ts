import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private functionUrl: string;
  private http = inject(HttpClient);

  constructor() {
    this.functionUrl = environment.functionsUrl;
  }

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.functionUrl}`).pipe(
      map((result) => {
        return result.users;
      }),
      catchError((error) => {
          console.error('Error fetching users:', error);
          return of([]);
        }
      ));
  }
}
