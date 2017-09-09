import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TickerService, Ticker } from '../ticker.service';

declare const window: any;

const Highcharts = window.Highcharts;

let lineChartCounter = 0;

interface TickerData {
  symbol: string,
  price: number
}

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  providers: [
    TickerService
  ]
})
export class TickerComponent implements OnInit, OnDestroy {

  @Input()
  public symbol: string;

  data$ = Observable.defer(
    () => this.tickerService.getTickerStream(this.symbol)
  )
  .map(d => d.price)

  @Input() 
  public title: string;

  private subscription: Subscription;

  constructor(
    private elemRef: ElementRef,
    private tickerService: TickerService
  ) {
  }

  ngOnInit() {
    const self = this;
    const { data$, title } = self;

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    // const elemId = `line-chart-${lineChartCounter++}`;

    new Highcharts.Chart({
      chart: {
        renderTo: this.elemRef.nativeElement.querySelector('.chart'),
        type: 'spline',
        animation: true,
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            let series = this.series[0];

            if (!data$) {
              throw new Error('no data stream provided');
            }

            self.subscription = data$.subscribe(
              y => series.addPoint([(new Date()).getTime(), y], true, true)
            );
          }
        }
      },
        title: {
          text: title
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'Value'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
              Highcharts.numberFormat(this.y, 2);
          }
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Random data',
          data: (function () {
            // generate an array of random data
            let data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: 0
              });
            }
            return data;
          }())
        }]
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
