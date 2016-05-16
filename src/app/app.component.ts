import {Component} from 'angular2/core';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import { SignUpComponent } from './auth/signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'app',
    directives: [LoginComponent, ROUTER_DIRECTIVES],
    templateUrl: 'app/app.component.html',
    styleUrls: ['assets/css/app.component.css'],
})
@RouteConfig([
      {
          path: '/',
          name: 'Landing',
          component: LandingComponent,
          useAsDefault: true
      },
      {
          path: '/home',
          name: 'Home',
          component: HomeComponent,
      },

])
export class App {}
