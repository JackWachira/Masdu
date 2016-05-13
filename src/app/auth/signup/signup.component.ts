import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import {AuthenticationService} from '../auth.service';
import {DisplayService} from '../display.service';
import { User }    from '../user';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

@Component({
    selector: 'register-form',
    providers: [AuthenticationService, DisplayService],
    templateUrl: 'app/auth/signup/signup.component.html',
    styleUrls: ['assets/css/login.css']
})

export class SignUpComponent {

    public errorMsg = '';
    @Output() signupChange = new EventEmitter();

    constructor(
        private _service:AuthenticationService, public http: Http, private _displservice:DisplayService) {}

    model = new User(1, "jackmwa94@gmail.com","passw", "Jack")
    submitted = false;
    correct = true;
    @Input() userobj;
    public arrayOfKeys;
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        let username = this.model.username;
        console.log(email + password + username);
        this.sendRequest(email, username, password);
    }
    sendRequest(email,username,password){
        var params = "email=" + email + "&password=" + password+
                    "&username=" + username;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost:8000/api/auth/register', params, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(
          data => this.saveJwt(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
          );
    }

    logError(err) {
        this.correct = false;
        this.userobj= JSON.parse(err["_body"]);
        this.arrayOfKeys = Object.keys(this.userobj);
    }
    saveJwt(data){
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
