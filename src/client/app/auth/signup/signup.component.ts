import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService} from '../auth.service';
import {DisplayService} from '../display.service';
import { User }    from '../user';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'register-form',
    moduleId: module.id,
    providers: [AuthenticationService, DisplayService, Http, HTTP_PROVIDERS],
    templateUrl: 'signup.component.html',
    styleUrls: ['login.css']
})

export class SignUpComponent {

    public errorMsg = '';
    @Output() signupChange = new EventEmitter();

    constructor(
        private _service:AuthenticationService, public http: Http, private _displservice:DisplayService) {}

    model = new User(1, "jackmwa94@gmail.com","passw", "Jack")
    submitted = false;
    correct = true;
    @Input() userobj:any;
    public arrayOfKeys:any;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        let username = this.model.username;
        console.log(email + password + username);
        this.sendRequest(email, username, password);
    }
    sendRequest(email:any,username:any,password:any){
        var params = "email=" + email + "&password=" + password+
                    "&username=" + username;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('https://masduapi.herokuapp.com/auth/register/', params, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(
          data => this.saveJwt(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
          );
    }

    logError(err:any) {
        this.correct = false;
        this.userobj= JSON.parse(err["_body"]);
        this.arrayOfKeys = Object.keys(this.userobj);
    }
    saveJwt(data:any){
        console.log(data)
        this._displservice.setregister();
        this.signupChange.emit({
            value: true
            })


    }

    active = true;
    showLogin(){
        console.log("login clicked");
        this.signupChange.emit({
            value: true
            })
    }
}
