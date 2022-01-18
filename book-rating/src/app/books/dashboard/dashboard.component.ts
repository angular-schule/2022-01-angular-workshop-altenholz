import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';


@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        rating: 5,
        description: 'Grundlagen und mehr',
        price: 36.9
      },
      {
        isbn: '456',
        title: 'Vue.js',
        rating: 3,
        description: 'Das grüne Framework',
        price: 32.9
      }
    ];
  }

  ngOnInit(): void {
  }

  onRateUp(book: Book) {
    console.log('UP', book);
  }

  onRateDown(book: Book) {
    console.log('DOWN', book);
  }

}
