import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public fetchFromLocalStorage() {
    return window.localStorage.foodStorage;
  }
}
