import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  likedCards: any[] = [];

  constructor(public dataService: DataService, private _localStorage: LocalStorageService) { }

  ngOnInit(): void {
    if (this._localStorage.fetchFromLocalStorage()) {
      this.likedCards = JSON.parse(window.localStorage.foodStorage);
    }
  }

  filteredLikes() {
    const likedCards = this.likedCards.filter(item => item.type === 'likes');
    const products = this.dataService.readFile;

    return products.filter((f: any) => likedCards.some(item => item.id === f.id));
  }
}
