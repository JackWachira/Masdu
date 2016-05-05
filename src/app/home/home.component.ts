import {Component} from 'angular2/core';
import {AuthenticationService} from '../auth/auth.service';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'app/home/home.component.html',
})

export class PrivateComponent {

    constructor(
        private _service:AuthenticationService){}

    ngOnInit(){
        this._service.checkCredentials();
    }

    logout() {
        this._service.logout();
    }
}
