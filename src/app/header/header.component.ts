import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  onSave() {
    this.dataStorageService.storeRecipes();
  }
  onFetch() {
    this.dataStorageService.fetchRecipes();
  }
}
