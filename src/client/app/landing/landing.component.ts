import {Component, OnInit} from '@angular/core';
import {LoginComponent} from '../auth/login/login.component';
import {SignUpComponent} from '../auth/signup/signup.component';
import { Router } from '@angular/router';


@Component({
    selector: 'landing-page',
    moduleId: module.id,
    directives: [LoginComponent,SignUpComponent],
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.css'],
})
export class LandingComponent{
    login: boolean = true;
    register_success: boolean= false;

    myValueChange($event:any) {
        this.login = $event['value'];
        console.log(this.login);
      }

    registerTrigger($event:any) {
        this.register_success = $event['value'];
      }

    constructor(private router: Router) {
    }
}
