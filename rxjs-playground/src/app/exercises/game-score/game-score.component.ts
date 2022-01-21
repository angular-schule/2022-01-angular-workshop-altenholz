import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore?: number;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen und den finalen Punktestand zu ermitteln...
     */

    /******************************/

    // Current Score
    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => this.currentScore = score);

    // Final Score
    this.score$.pipe(
      reduce((acc, item) => acc + item, 0)
    ).subscribe(score => this.finalScore = score);


    /******************************/


    /*
    of(
        { city: 'Leipzig' },
        { name: 'Ferdinand' },
        { framework: 'Angular' },
        { name: 'Maria', framework: 'Vue.js' },
        { city: 'Berlin' },
        { city: 'Hamburg' },
        { name: 'Karl' },
      ).pipe(
        scan((acc, item) => {
          return { ...acc, ...item };
        }, {})
      ).subscribe(console.log);
      */

      of(
        'SETNAMEFERDINAND', // { type: 'SETNAME', payload: 'Ferdinand' }
        'INVALID',
        'SETCITYHAMBURG',
        'SETFRANG',
        'SETBOOKS'
      ).pipe(
        /////////////////////
        scan((acc, msg) => {
          switch (msg) {
            case 'SETNAMEFERDINAND': return { ...acc, name: 'Ferdinand', city: 'Leipzig' };
            case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig' };
            case 'SETCITYHAMBURG': return { ...acc, city: 'Hamburg', name: 'Tobias' };
            case 'SETCITYSTUTTGART': return { ...acc, city: 'Stuttgart' };
            case 'SETFRANG': return { ...acc, framework: 'Angular', company: 'Google' };
            default: return acc;
          }
        }, { city: 'Berlin', name: 'Max' })
      ).subscribe(console.log);



    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
