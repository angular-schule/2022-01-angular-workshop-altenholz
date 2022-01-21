import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, of, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl('');
  result$: Observable<Book[]>;

  loading = false;

  constructor(private bs: BookStoreService) {
    const term$: Observable<string> = this.searchControl.valueChanges

    this.result$ = term$.pipe(
      debounceTime(1000),
      filter(term => term.length >= 3 || term.length === 0),
      distinctUntilChanged(),

      switchMap(term => {
        if (term.length === 0) {
          return of([]);
        } else {
          return this.bs.search(term);
        }
      }),
      tap(() => this.loading = false),
    );




    // Suchbegriff mindestens 3 Zeichen lang (RxJS)
    // nicht zu viele Anfragen hintereinander
    // keine zwei gleichen Begriffe direkt nacheinander //
    // BookStoreService.search()
    // anzeigen (ganz einfach)
    // AsyncPipe
    // Zusatz: Ladeanzeige //
  }

  ngOnInit(): void {
  }

}
