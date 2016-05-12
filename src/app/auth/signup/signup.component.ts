import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService} from '../auth.service';
import { User }    from '../user';

@Component({
    selector: 'register-form',
    providers: [AuthenticationService],
    templateUrl: 'app/auth/signup/signup.component.html',
    styleUrls: ['assets/css/login.css']
})

export class SignUpComponent {

    public errorMsg = '';
    @Output() signupChange = new EventEmitter();
    constructor(
        private _service:AuthenticationService) {}

    model = new User(1, "jackmwa94@gmail.com","passw", "Jack", "Mwangi")
    submitted = false;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        let fname = this.model.last_name;
        let lname = this.model.first_name;
        console.log(email + password + fname + lname);
    }

    active = true;
    showLogin(){
        console.log("login clicked");
        this.signupChange.emit({
            value: true
            })
    }
}
