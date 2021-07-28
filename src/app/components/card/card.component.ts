import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit {

  public infoShown: boolean[] = [];
  public isLiked: boolean = false;
  public isDisliked: boolean = false;
  public completedCards: any[] = [];

  constructor(public dataService: DataService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.fetchFromLocalStorage();
  }

  ngOnDestroy() {
    this.completedCards = [];
  }

  filteredProducts() {
    return this.dataService.readFile.filter((item: any) => item.category.name === 'Hauptspeisen - Mains');
  }

  infoBtn(index: number) {
    if (this.infoShown[index]) {
      this.infoShown[index] = false;
    } else {
      this.infoShown[index] = true;
    }
  }

  cleanCompleted(i: any) {
    return this.completedCards.some(el => el.index === i);
  }

  actionsBtn(index: number, type: string, id: string) {
    let isElementAdded: boolean;
    const objData: any = {};
    objData['index'] = index;
    objData['id'] = id;
    objData['type'] = type;

    isElementAdded = this.completedCards.some(el => el.id === id);

    if (!isElementAdded) {

      this.completedCards.push(objData);
      this.saveToLocalStorage();

      if (type === 'likes') {
        this.isLiked = true;
        setTimeout(() => {
          this.isLiked = false;
        }, 600);
      } else {
        this.isDisliked = true;
        setTimeout(() => {
          this.isDisliked = false;
        }, 600);
      }
    } else {
      this.toastrService.warning('sorry card is already stored, clear the local storage');
    }
  }

  saveToLocalStorage() {
    window.localStorage.foodStorage = JSON.stringify(this.completedCards);
  }

  fetchFromLocalStorage() {
    if (window.localStorage.foodStorage) {
      this.completedCards = JSON.parse(window.localStorage.foodStorage);
    }
  }

}
