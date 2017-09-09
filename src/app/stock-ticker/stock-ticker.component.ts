import { Component } from '@angular/core';
import { Ticker, TickerService } from '../ticker.service';

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.css']
})
export class StockTickerComponent {

  tickers: Ticker[] = [];

  addTicker(ticker: Ticker) {
    this.tickers.push(ticker);
  }

  removeTicker(ticker: Ticker) {
    const i = this.tickers.indexOf(ticker);
    if (i !== -1) {
      this.tickers.splice(i, 1);
    }
  }
}
