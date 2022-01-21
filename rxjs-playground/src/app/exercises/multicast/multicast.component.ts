import { Component } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();

  measureValues$: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {
    /**************!!**************/
    // this.measureValues$ = this.mvs.getValues().pipe(share()); // shareReplay(1)

    this.measureValues$ = new ReplaySubject(5);
    this.mvs.getValues().subscribe(this.measureValues$);

    /*setTimeout(() => {
      this.measureValues$.next(1);
    }, 3000);

    setTimeout(() => {
      this.measureValues$.next(2);
    }, 5000);

    setTimeout(() => {
      this.measureValues$.next(3);
    }, 10000);*/

    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

}
