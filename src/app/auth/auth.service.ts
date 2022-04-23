import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.action';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
  private key = `AIzaSyAPMImHcJFscgBjRqE2405tta41DUQIbsc`;
  // public user = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new fromAuth.Logout());
    }, 36000);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
  // signup(email: string, password: string): Observable<AuthData> {
  //   return this.http
  //     .post<AuthData>(`${this.signupUrl}${environment.firebaseAPIKey}`, {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     })
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((data) => this.handleAuthentication(data))
  //     );
  // }

  // login(email: string, password: string): Observable<AuthData> {
  //   return this.http
  //     .post<AuthData>(`${this.signInUrl}${environment.firebaseAPIKey}`, {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     })
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((data) => this.handleAuthentication(data))
  //     );
  // }
  // private handleAuthentication(authData: AuthData) {
  //   //this not working
  //   const expirationDate = new Date(
  //     new Date().getTime() + parseInt(authData.expireIn) * 1000
  //   );
  //   const _user = new User(
  //     authData.email,
  //     authData.localId,
  //     authData.idToken,
  //     new Date(new Date().getHours() + 1)
  //   );

  //   if (_user.token) {
  //     this.store.dispatch(
  //       new authActions.AuthenticateSuccess({
  //         email: _user.email,
  //         userId: _user.id,
  //         token: _user.token,
  //         expirationDate: new Date(),
  //       })
  //     );
  //     localStorage.setItem('user', JSON.stringify(_user));
  //     this.autoLogout(3600 * 1000);
  //     // this.user.next(_user);
  //   }
  // }

  // autoLogin() {
  //   const user: User = JSON.parse(localStorage.getItem('user')!);
  //   if (!user) {
  //     return;
  //   }

  //   //TODO: if token is valid
  //   if (user?.token) {
  //     this.autoLogout(3600 * 1000);
  //     // this.user.next(user);
  //     this.store.dispatch(
  //       new authActions.AuthenticateSuccess({
  //         email: user.email,
  //         userId: user.id,
  //         token: user.token,
  //         expirationDate: new Date(),
  //       })
  //     );
  //   }
  // }

  // private handleError(errorRes: HttpErrorResponse): Observable<any> {
  //   let errorMessage = 'Unknown Error';
  //   if (!errorRes?.error || !errorRes?.error?.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes?.error?.error?.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'this email exists already';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'Email Not Found';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Invalid Password';
  //       break;
  //   }

  //   return throwError(errorMessage.trim());
  // }

  // logout() {
  //   // this.user.next(null);
  //   this.store.dispatch(new authActions.Logout());
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/auth']);

  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //   }

  //   this.timer = null;
  // }
}
