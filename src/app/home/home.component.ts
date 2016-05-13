import {Component, OnInit} from 'angular2/core';
import {AuthenticationService} from '../auth/auth.service';
import {LoginComponent} from '../auth/login/login.component';
import {SignUpComponent} from '../auth/signup/signup.component';

@Component({
    selector: 'home',
    providers: [AuthenticationService],
    directives: [LoginComponent,SignUpComponent],
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['assets/css/home.component.css'],
})
export class HomeComponent implements OnInit{
    login: boolean = true;
    register_success: boolean= false;

    myValueChange($event) {
        this.login = $event['value'];
        console.log(this.login);
      }
    registerTrigger($event) {
        this.register_success = $event['value'];
      }

    constructor(
        private _service:AuthenticationService){
    }

    ngOnInit(){
    }
}
