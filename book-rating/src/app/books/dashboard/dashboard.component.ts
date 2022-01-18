import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';


@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private rs: BookRatingService) {
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
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  onRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b);
  }

}
