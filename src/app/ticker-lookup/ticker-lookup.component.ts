import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TickerService, Ticker } from '../ticker.service';

@Component({
  selector: 'app-ticker-lookup',
  templateUrl: './ticker-lookup.component.html',
  styleUrls: ['./ticker-lookup.component.css'],
  providers: [
    TickerService
  ]
})
export class TickerLookupComponent {
  searchChange$ = new Subject<string>();

  @Output()
  select = new EventEmitter<Ticker>();

  selection$ = this.searchChange$
    .switchMap(q =>
      this.tickerService.search(q)
    )
    .merge(
      this.select.map(() => [])
    );

  constructor(private tickerService: TickerService) {}
}
