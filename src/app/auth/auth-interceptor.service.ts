import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      map((authState) => authState.user),
      exhaustMap((user: User | null) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user?.token ?? ''),
        });
        // return next.handle(modifiedReq);
        return next.handle(modifiedReq);
      })
    );
  }
}
