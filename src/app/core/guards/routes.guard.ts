import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanLoad, CanActivate {

  constructor(private _localStorage: LocalStorageService, private _router: Router, private toastrService: ToastrService) { }

  canLoad(): boolean {
    return this.checkLocalStorage();
  }

  canActivate(): boolean {
    return this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (this._localStorage.fetchFromLocalStorage()) {
      return true;
    } else {
      this.toastrService.warning('There are no stored cards');
      this._router.navigate(['/']);
      return false;
    }
  }

}
