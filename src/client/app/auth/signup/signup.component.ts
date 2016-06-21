import {Component, ElementRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
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

    model = new User(1, "","", "", "")
    @ViewChild('confirmPassword') confirmPassword: any;
    @ViewChild('passwordd') Password: any;

    constructor(public http: Http, private _displservice: DisplayService) { }

    // Called when signup is clicked
    onSubmit(element: HTMLInputElement) {
        this.submitted = true;
        let email = this.model.email;
        let password = this.model.password;
        let username = this.model.username;
        let confirm_password = this.model.confirm_password;
        if(confirm_password!=password){
            element.setCustomValidity("Passwords do not match");
        }else{
            this.sendRequest(email, username, password, confirm_password);
        }

    }
    validateConfirm(element: HTMLInputElement, element2: HTMLInputElement) {
        if (element.value != element2.value && (element2.value.length>0)) {
            return false;
        }
        return true;
    }

    // Api request to sign up
    sendRequest(email: any, username: any, password: any, confirm_password:any) {
        var params = "email=" + email + "&password=" + password+
            "&username=" + username + "&confirm_password=" + confirm_password;
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
