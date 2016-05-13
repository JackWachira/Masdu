import {Component, ElementRef, OnInit,Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService} from '../auth.service';
import {DisplayService} from '../display.service';
import { User }    from '../user';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService, DisplayService],
    templateUrl: 'app/auth/login/login.component.html',
    styleUrls: ['assets/css/login.css'],
})

export class LoginComponent implements OnInit {

    public errorMsg = '';
    @Output() loginChange = new EventEmitter();
    @Input() register_success: boolean = false;

    model = new User(1, "jackmwa94@gmail.com","passw", "Jack")

    submitted = false;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
    }
    closealert(){
        this.register_success = true;
    }
    active = true;
    constructor(
        private _service: AuthenticationService, private evt: DisplayService) {
    }

    newUser() {
        this.model = new User(1, "", "", "");
        this.active = false;
        setTimeout(()=> this.active=true, 0);
    }

    ngOnInit(){
        this.register_success = this.evt.getregister();
    }
    showSignUp(){
        this.loginChange.emit({
            value: false
            })
    }
}
