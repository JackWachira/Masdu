import {Component, OnInit} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import { SignUpComponent } from './auth/signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';

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
        var jwtHelper = new JwtHelper();
        var token = localStorage.getItem('auth_token');
        if(token){
            console.log(jwtHelper.isTokenExpired(token));
            if (jwtHelper.isTokenExpired(token)) {
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['/home']);
            }
        }else{
            this.router.navigate(['/']);
        }

    }
 }
