import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      // rating: book.rating === 5 ? book.rating : book.rating + 1
      rating: Math.min(5, book.rating + 1)
    };
  }

  rateDown(book: Book): Book {
    if (book.rating === 1) {
      return book;
    }

    return {
      ...book,
      rating: book.rating - 1
    }
  }
}
