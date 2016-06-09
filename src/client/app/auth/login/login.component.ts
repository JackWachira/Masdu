import {Component, ElementRef, OnInit,Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../auth.service';
import {DisplayService} from '../display.service';
import { User }    from '../user';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'login-form',
    moduleId: module.id,
    providers: [AuthenticationService, DisplayService, Http, HTTP_PROVIDERS],
    templateUrl: 'login.component.html',
    styleUrls: ['login.css'],
})

export class LoginComponent implements OnInit {

    public errorMsg = '';
    @Output() loginChange = new EventEmitter();
    @Input() register_success: boolean = false;
    correct = true;
    @Input() userobj:any;
    public arrayOfKeys:any;
    model = new User(1, "","", "")

    submitted = false;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        var params = "username=" + email + "&password=" + password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('https://masduapi.herokuapp.com/api/auth/login/', params, {
            headers: headers
        })
            .map(res => res.json())
            .subscribe(
            data => this.onComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
            );
    }
    logError(err:any) {
        console.log(err);
        this.correct = false;
        this.userobj = JSON.parse(err["_body"]);
        this.arrayOfKeys = Object.keys(this.userobj);
    }
    onComplete(data:any){
        console.log(data);
        localStorage.setItem('auth_token', data["token"]);
        this.router.navigate(['/home']);
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
