import {Injectable, EventEmitter} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DisplayService {

  public static showregister: boolean=true;

  setregister() {
      DisplayService.showregister = false;
  }
  getregister(){
      return DisplayService.showregister;

  }
}
