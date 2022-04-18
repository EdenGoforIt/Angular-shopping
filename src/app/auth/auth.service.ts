import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthData } from './auth-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
  private key = `AIzaSyAPMImHcJFscgBjRqE2405tta41DUQIbsc`;
  constructor(private http: HttpClient) {}
  signup(email: string, password: string): Observable<AuthData> {
    return this.http
      .post<AuthData>(`${this.signupUrl}${this.key}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthData> {
    return this.http
      .post<AuthData>(`${this.signInUrl}${this.key}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown Error';
    if (!errorRes?.error || !errorRes?.error?.error) {
      return throwError(errorMessage);
    }
    switch (errorRes?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }

    return throwError(errorMessage.trim());
  }
}
