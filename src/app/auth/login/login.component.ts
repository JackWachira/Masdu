import {Component, ElementRef, OnInit,Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService} from '../auth.service';
import {DisplayService} from '../display.service';
import { User }    from '../user';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { RouteParams, Router } from '@angular/router-deprecated';

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
    correct = true;
    @Input() userobj;
    public arrayOfKeys;
    model = new User(1, "jackmwa94@gmail.com","passw", "Jack")

    submitted = false;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        var params = "email=" + email + "&password=" + password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost:8000/api/auth/login/', params, {
            headers: headers
        })
            .map(res => res.json())
            .subscribe(
            data => this.onComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
            );
    }
    logError(err) {
        this.correct = false;
        this.userobj = JSON.parse(err["_body"]);
        this.arrayOfKeys = Object.keys(this.userobj);
    }
    onComplete(data){
        localStorage.setItem('jwt', data["Authorization"]);
        this.router.navigate(['Home']);

    }
    closealert(){
        this.register_success = true;
    }
    active = true;
    constructor(
        private _service: AuthenticationService, private evt: DisplayService, public http: Http, private router: Router) {
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
