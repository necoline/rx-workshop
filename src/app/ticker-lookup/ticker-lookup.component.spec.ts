import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerLookupComponent } from './ticker-lookup.component';

describe('TickerLookupComponent', () => {
  let component: TickerLookupComponent;
  let fixture: ComponentFixture<TickerLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
