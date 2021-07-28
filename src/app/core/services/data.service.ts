import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _jsonURL = 'assets/data/products.json';
  public readFile: any[] = [];


  constructor(private http: HttpClient) {
    setTimeout(()=> {
      this.getJSON().subscribe(data => {
        this.readFile = data;
      });
    },2000);
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
}
