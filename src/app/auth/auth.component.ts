import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { AuthData } from './auth-data';
import { AuthService } from './auth.service';
import * as authActions from './store/auth.action';
@Component({
  selector: 'app-auto',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy, OnInit {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective | undefined;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = '';
  private sub: Subscription | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('auth').subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.error;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      })

      //
    );
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();

    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    let authOb: Observable<AuthData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      // authOb = this.authService.login(email, password);
      this.store.dispatch(
        new authActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new authActions.SignUpStart({ email: email, password: password })
      );
    }
    // authOb.subscribe({
    //   next: (authData: AuthData) => {
    //     this.router.navigate(['/recipes']);
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.error = error;
    //     this.showErrorAlert(error);
    //   },
    // });
    form.reset();
  }

  onCloseAlert() {
    // this.error = null;
    this.store.dispatch(new authActions.ClearError());
  }

  private showErrorAlert(message: string) {
    const alertComponentFac =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    hostViewContainerRef?.clear();

    let componentRef: ComponentRef<AlertComponent> =
      hostViewContainerRef?.createComponent(
        alertComponentFac
      ) as ComponentRef<AlertComponent>;

    componentRef.instance.message = message;
    this.sub = componentRef.instance.close.subscribe(() => {
      this.sub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }
}
