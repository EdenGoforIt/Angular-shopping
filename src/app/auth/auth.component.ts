import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthData } from './auth-data';
import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auto',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective | undefined;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = '';
  private sub: Subscription | undefined;

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
      authOb = this.authService.login(email, password);
    } else {
      authOb = this.authService.signup(email, password);
    }

    authOb.subscribe({
      next: (authData: AuthData) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
        this.showErrorAlert(error);
      },
    });
    form.reset();
  }

  onCloseAlert() {
    this.error = null;
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
