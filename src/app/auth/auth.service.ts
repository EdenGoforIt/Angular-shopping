import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthData } from './auth-data';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
  private key = `AIzaSyAPMImHcJFscgBjRqE2405tta41DUQIbsc`;

  public user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}
  signup(email: string, password: string): Observable<AuthData> {
    return this.http
      .post<AuthData>(`${this.signupUrl}${this.key}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((data) => this.handleAuthentication(data))
      );
  }

  login(email: string, password: string): Observable<AuthData> {
    return this.http
      .post<AuthData>(`${this.signInUrl}${this.key}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((data) => this.handleAuthentication(data))
      );
  }
  private handleAuthentication(authData: AuthData) {
    //this not working
    const expirationDate = new Date(
      new Date().getTime() + parseInt(authData.expireIn) * 1000
    );
    const _user = new User(
      authData.email,
      authData.localId,
      authData.idToken,
      new Date(new Date().getHours() + 1)
    );

    this.user.next(_user);
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
