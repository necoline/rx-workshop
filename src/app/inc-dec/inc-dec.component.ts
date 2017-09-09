import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface IAction {
  type: string
}

@Component({
  selector: 'app-inc-dec',
  templateUrl: './inc-dec.component.html',
  styleUrls: ['./inc-dec.component.css']
})
export class IncDecComponent {
  action$ = new BehaviorSubject<IAction>({ type: 'INIT' });

  state$ = this.action$.scan((state, action) => {
    switch (action.type) {
      case 'INC':
        return state + 1;
      case 'DEC':
        return state - 1;
      default:
        return state;
    }
  }, 0);
}
