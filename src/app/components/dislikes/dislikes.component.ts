import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-dislikes',
  templateUrl: './dislikes.component.html',
  styleUrls: ['./dislikes.component.scss']
})
export class DislikesComponent implements OnInit {

  dislikedCards: any[] = [];

  constructor(public dataService: DataService, private _localStorage: LocalStorageService) { }

  ngOnInit(): void {
    if (this._localStorage.fetchFromLocalStorage()) {
      this.dislikedCards = JSON.parse(window.localStorage.foodStorage);
    }
  }

  filteredDislikes() {
    const dislikedCards = this.dislikedCards.filter(item => item.type === 'dislikes');
    const products = this.dataService.readFile;

    return products.filter((f: any) => dislikedCards.some(item => item.id === f.id));
  }

}
