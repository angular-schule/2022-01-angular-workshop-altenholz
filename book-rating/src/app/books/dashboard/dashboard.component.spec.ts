import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let book: Book;

  beforeEach(async () => {
    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 2
    };

    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    // Ausblick
    const storeMock = {
      getAll: () => of([]),
      getSingle: (isbn: string) => of(book),
    }

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // wenn BRS angefordert wird, wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service for onRateUp()', () => {
    const rs = TestBed.inject(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    // Act
    component.onRateUp(book);

    // Assert
    expect(rs.rateUp).toHaveBeenCalled();
  });


});
