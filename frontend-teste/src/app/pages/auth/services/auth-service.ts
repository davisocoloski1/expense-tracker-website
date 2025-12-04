import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  registro(email: string, password: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/registro`, { username, email, password })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password })
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/logout`)
  }
}
