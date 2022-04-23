import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthData } from '../auth-data';
import { User } from '../user.model';
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffects {
  private signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
  private key = `AIzaSyAPMImHcJFscgBjRqE2405tta41DUQIbsc`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  signup$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignUpStart): Observable<any> => {
        const { email, password } = authData.payload;

        return this.http
          .post<AuthData>(`${this.signupUrl}${environment.firebaseAPIKey}`, {
            email,
            password,
            returnSecureToken: true,
          })
          .pipe(
            tap((resData: AuthData) =>
              this.authService.setLogoutTimer(3600 * 1000)
            ),
            map((resData: AuthData) => {
              return handleAuthentication(resData);
            }),
            catchError((err) => {
              return handleError(err);
            })
          );
      })
    )
  );

  login$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart): Observable<any> => {
        const { email, password } = authData.payload;

        return this.http
          .post<AuthData>(`${this.signInUrl}${environment.firebaseAPIKey}`, {
            email,
            password,
            returnSecureToken: true,
          })
          .pipe(
            tap((resData: AuthData) => this.authService.setLogoutTimer(5000)),
            map((resData: AuthData) => {
              return handleAuthentication(resData);
            }),
            catchError((err) => {
              return handleError(err);
            })
          );
      })
    )
  );

  autoLogin$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map((): AuthActions.AuthenticateSuccess | AuthActions.NoOperation => {
        const user: User | null = JSON.parse(
          localStorage.getItem('user') ?? 'null'
        );

        if (!user) {
          return new AuthActions.NoOperation();
          // return { type: 'DUMMY' };
        }

        // //TODO: if token is valid
        if (user?.token) {
          return new AuthActions.AuthenticateSuccess({
            email: user.email,
            userId: user.id,
            token: user.token,
            expirationDate: new Date(),
          });
        }
        return new AuthActions.NoOperation();
        // return { type: 'DUMMY' };
      })
    )
  );

  //let effect know we are not dispatching an action that what normal effects do
  // @Effect({ dispatch: false }) // an old way
  authRedirect$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  // @Effect({ dispatch: false })
  autoLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('user');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
  // authLogout =createEffect(()=> this.actions$.pipe(
  //   ofType(AuthActions.LOGOUT),
  //   tap(() => {
  //     localStorage.removeItem('user');
  //     this.authService.clearLogoutTimer();
  //     this.router.navigate(['/']);
  //   })
  // ));
}

const handleAuthentication = (
  resData: AuthData
): AuthActions.AuthenticateSuccess => {
  localStorage.setItem('user', JSON.stringify(resData));

  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: new Date(),
  });
};

const handleError = (
  errorRes: HttpErrorResponse
): Observable<AuthActions.AuthenticateFail> => {
  let errorMessage = 'Unknown Error';

  if (!errorRes?.error || !errorRes?.error?.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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

  return of(new AuthActions.AuthenticateFail(errorMessage));
};
