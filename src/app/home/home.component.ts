import {Component, OnInit} from 'angular2/core';
import {AuthenticationService} from '../auth/auth.service';
import {LoginComponent} from '../auth/login/login.component';

@Component({
    selector: 'home',
    providers: [AuthenticationService],
    directives: [LoginComponent],
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['assets/css/home.component.css'],
})
export class HomeComponent implements OnInit{
    login: boolean = true;

    myValueChange($event) {
        this.login = $event['value'];
      }

    constructor(
        private _service:AuthenticationService){
    }

    ngOnInit(){
    }
}
