import {Component, OnInit} from 'angular2/core';
import {AuthenticationService} from '../auth/auth.service';
import {LoginComponent} from '../auth/login/login.component';
import {SignUpComponent} from '../auth/signup/signup.component';
import { RouteParams, Router } from '@angular/router-deprecated';


@Component({
    selector: 'landing-page',
    providers: [AuthenticationService],
    directives: [LoginComponent,SignUpComponent],
    templateUrl: 'app/landing/landing.component.html',
    styleUrls: ['assets/css/landing.component.css'],
})
export class LandingComponent implements OnInit{
    login: boolean = true;
    register_success: boolean= false;

    myValueChange($event) {
        this.login = $event['value'];
        console.log(this.login);
      }
    registerTrigger($event) {
        this.register_success = $event['value'];
      }

    ngOnInit() {
        let jwt = localStorage.getItem('jwt');
        console.log(jwt)
        if (jwt) {
            this.router.navigate(['Home']);
        }
    }

    constructor(
        private _service: AuthenticationService, private router: Router) {
    }
}
