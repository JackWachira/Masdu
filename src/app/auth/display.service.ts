import {Injectable, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DisplayService {

  private display: boolean=true;

  // stream1$ = new Observable(observer => {
  //     observer.next(this.display);
  // });

  nameChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  login() {
    this.display = true;
  }
  signup() {
    this.display = false;
    this.nameChange.emit(this.display);
  }
  getvalue(){
      return this.display;
  }
}
