import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService, User} from '../auth.service';

@Component({
    selector: 'register-form',
    providers: [AuthenticationService],
    templateUrl: 'app/auth/signup/signup.component.html',
    styleUrls: ['assets/css/login.css']
})

export class SignUpComponent {

    public user = new User('','');
    public errorMsg = '';
    @Output() signupChange = new EventEmitter();
    constructor(
        private _service:AuthenticationService) {}

    login() {
        if(!this._service.login(this.user)){
            this.errorMsg = 'Failed to login';
        }
    }
    showLogin(){
        console.log("login clicked");
        this.signupChange.emit({
            value: true
            })
    }
}
