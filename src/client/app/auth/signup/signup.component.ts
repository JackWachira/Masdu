import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {DisplayService} from '../display.service';
import { User }    from '../user';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'register-form',
    moduleId: module.id,
    providers: [DisplayService, Http, HTTP_PROVIDERS],
    templateUrl: 'signup.component.html',
    styleUrls: ['login.css']
})

export class SignUpComponent {

    public arrayOfKeys:any;
    public errorMsg = '';
    active = true;
    submitted = false;
    correct = true;

    @Output() signupChange = new EventEmitter();
    @Input() userobj:any;

    model = new User(1, "","", "")


    constructor(public http: Http, private _displservice: DisplayService) { }

    // Called when signup is clicked
    onSubmit() {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        let username = this.model.username;
        this.sendRequest(email, username, password);
    }

    // Api request to sign up
    sendRequest(email:any,username:any,password:any){
        var params = "email=" + email + "&password=" + password+
                    "&username=" + username;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('https://masduapi.herokuapp.com/api/auth/register/', params, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(
          data => this.onComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
          );
    }

    // Executed when request is unsuccessful
    logError(err:any) {
        this.correct = false;
        this.userobj= JSON.parse(err["_body"]);
        this.arrayOfKeys = Object.keys(this.userobj);
    }

    // Executed when request is successful
    onComplete(data: any) {
        this._displservice.setregister();
        this.signupChange.emit({
            value: true
            })
    }

    // Emit event to signup
    showLogin(){
        this.signupChange.emit({
            value: true
            })
    }
}
