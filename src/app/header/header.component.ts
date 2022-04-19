import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }
  onFetch() {
    this.dataStorageService.fetchRecipes();
  }
  logout() {
    this.authService.logout();
  }
}
