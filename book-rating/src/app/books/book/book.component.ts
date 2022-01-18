import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  @Input() book?: Book;

  constructor() {}

  ngOnInit(): void {}

  onRateUp() {
    if (this.book) {
      this.rateUp.emit(this.book);
    }
  }

  onRateDown() {
    this.book && this.rateDown.emit(this.book);
  }

}
