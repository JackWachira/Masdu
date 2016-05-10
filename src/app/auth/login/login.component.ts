import {Component, ElementRef, OnInit,Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService, User} from '../auth.service';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'app/auth/login/login.component.html',
    styleUrls: ['assets/css/login.css']
})

export class LoginComponent implements OnInit{

    public user = new User('','');
    public errorMsg = '';
    @Output() loginChange = new EventEmitter();
    constructor(
        private _service:AuthenticationService){}

    ngOnInit(){
    }
    showSignUp(){
        console.log("signup clicked");
        this.loginChange.emit({
            value: false
            })
    }
}
