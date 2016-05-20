import {Component, OnInit} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import { SignUpComponent } from './auth/signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

@Component({
    selector: 'app',
    directives: [LoginComponent, ROUTER_DIRECTIVES],
    templateUrl: 'app/app.component.html',
    styleUrls: ['assets/css/app.component.css'],
})

@Routes([
    {
        path: '/',
        component: LandingComponent
    },
    {
        path: '/home',
        component: HomeComponent
    },

])
export class App implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.navigate(['/']);
    }
 }
