import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


export interface Ticker {
  IPOYear: string,
  industry: string,
  lastSale: string,
  marketCap: string,
  name: string,
  sector: string,
  summaryQuote: string,
  symbol: string
}

export interface TickerStreamData {
  symbol: string,
  price: number
}

@Injectable()
export class TickerService {

  socket$ = Observable.webSocket('ws://localhost:8080');

  constructor(private http: Http) { }

  search(symbol: string): Observable<Ticker[]> {
    return this.http.get(`http://localhost:8080/search?q=${symbol}`)
      .map(res => res.json())
      .catch(err => {
        console.error('Ignored: Search AJAX error');
        console.error(err);
        return Observable.empty();
      });
  }

  getTickerStream(symbol: string): Observable<TickerStreamData> {
    return this.socket$.multiplex(
      () => JSON.stringify({ type: 'sub', symbol }),
      () => JSON.stringify({ type: 'unsub', symbol }),
      (val: any) => val.symbol === symbol
    )
    .retryWhen(error$ => error$.switchMap(() => Observable.timer(2000)))
  }
}
