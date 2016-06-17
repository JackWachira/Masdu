import {Component, ElementRef, OnInit,Input, Output, EventEmitter} from '@angular/core';
import {DisplayService} from '../display.service';
import { User }    from '../user';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'login-form',
    moduleId: module.id,
    providers: [DisplayService, Http, HTTP_PROVIDERS],
    templateUrl: 'login.component.html',
    styleUrls: ['login.css'],
})

export class LoginComponent implements OnInit {

    public errorMsg = '';
    public arrayOfKeys:any;
    correct = true;
    active = true;
    submitted = false;

    @Output() loginChange = new EventEmitter();
    @Input() register_success: boolean = false;
    @Input() userobj:any;

    model = new User(1, "", "", "", "");

    constructor(private evt: DisplayService, public http: Http, private router: Router) {
    }

    // POST request when login button is clicked
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

    // Executed when api request is made unsuccessfully
    logError(err:any) {
        this.correct = false;
        this.userobj = JSON.parse(err["_body"]);
        this.arrayOfKeys = Object.keys(this.userobj);
    }

    // Executed when api request is made successfully
    onComplete(data:any){
        localStorage.setItem('auth_token', data["token"]);
        this.router.navigate(['/home']);
    }

    // Closes alert after registration
    closealert(){
        this.register_success = true;
    }

    ngOnInit(){
        this.register_success = this.evt.getregister();
    }

    // Emit event to show signup page
    showSignUp(){
        this.loginChange.emit({
            value: false
            })
    }
}
