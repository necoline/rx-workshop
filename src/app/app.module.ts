import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { IncDecComponent } from './inc-dec/inc-dec.component';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/retryWhen';

import { StockTickerComponent } from './stock-ticker/stock-ticker.component';
import { TickerComponent } from './ticker/ticker.component';
import { TickerLookupComponent } from './ticker-lookup/ticker-lookup.component';

const routes: Route[] = [
  { path: 'inc-dec', component: IncDecComponent },
  { path: 'stock-ticker', component: StockTickerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IncDecComponent,
    StockTickerComponent,
    TickerComponent,
    TickerLookupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
