import {Component, ElementRef, OnInit,Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService} from '../auth.service';
import { User }    from '../user';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'app/auth/login/login.component.html',
    styleUrls: ['assets/css/login.css']
})

export class LoginComponent implements OnInit{

    public errorMsg = '';
    @Output() loginChange = new EventEmitter();

    model = new User(1, "jackmwa94@gmail.com","passw", "Jack")

    submitted = false;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
    }

    active = true;
    constructor(
        private _service:AuthenticationService){}

    newUser() {
        this.model = new User(1, "", "", "");
        this.active = false;
        setTimeout(()=> this.active=true, 0);
    }

    ngOnInit(){
    }
    showSignUp(){
        console.log("signup clicked");
        this.loginChange.emit({
            value: false
            })
    }
}
