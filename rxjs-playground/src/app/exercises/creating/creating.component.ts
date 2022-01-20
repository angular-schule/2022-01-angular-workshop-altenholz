import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, ConnectableObservable } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('A', 'B', 'C')
    // from([1,2,3,4,5])
    // interval(1000)
    // timer(3000)

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      error: e => this.log('ERROR ' + e),
      complete: () => this.log('COMPLETE'),
    });


    function myOf(...args: string[]) {
      return new Observable(obs => {
        args.forEach(arg => obs.next(arg));
        obs.complete();
      });
    }



    /******************************/



    function producer(o: any) {
      o.next('A' + Math.random());
      o.next('B');

      setTimeout(() => o.next('HALLO'), 2000);
      setTimeout(() => o.complete(), 3000);
    }

    const observer = {
      // next: (e: any) => console.log(e),
      // error: (e: any) => console.error(e),
      complete: () => console.log('Complete')
    };

    // producer(obs);
    // producer(e => console.log('HALLO', e));

    // $: Finnische Notation
    const myObs$ = new Observable(producer);
    // myObs$.subscribe(observer);


    /******************************/

    // so KÖNNTE das Observable implementiert sein
    class MyObservable {
      constructor(private producer: any) {}

      subscribe(observer: any) {
        const subscriber = {
          next: observer.next || ((e: any) => {}),
          error: observer.error || ((e: any) => {}),
          complete: observer.complete || (() => {}),

        }

        this.producer(subscriber);
      }
    }




    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
