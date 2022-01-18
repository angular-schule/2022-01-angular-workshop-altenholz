import { TestBed } from '@angular/core/testing';
import { Book } from './book';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    // Alternative
    // service = new BookRatingService();

    book = {
      isbn: '',
      title: '',
      description: '',
      price: 1,
      rating: 3
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4); // nicht: book.rating + 1
  });

  it('should rate down a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    // Arrange
    book.rating = 5;

    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(5);
    expect(ratedBook.rating).not.toBeGreaterThan(5);
  });

  it('should not rate lower than 1', () => {
    // Arrange
    book.rating = 1;

    // Act
    const ratedBook = service.rateDown(book);

    // Assert
    expect(ratedBook.rating).toBe(1);
  });

});
