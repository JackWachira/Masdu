import {Component, ElementRef} from 'angular2/core';
import {AuthenticationService, User} from '../auth.service';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'app/auth/login/login.component.html',
    styleUrls: ['assets/css/login.css']
})

export class SignUpComponent {

    public user = new User('','');
    public errorMsg = '';

    constructor(
        private _service:AuthenticationService) {}

    login() {
        if(!this._service.login(this.user)){
            this.errorMsg = 'Failed to login';
        }
    }
}
