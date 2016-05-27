import { Bucketlist } from './bucketlist';
import { bucketlists } from './mockbucketlists';
import { Injectable } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BucketService {

    constructor(
        public authHttp: AuthHttp) {

    }
    getBucketLists(): Observable<Bucketlist[]>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Token ' + localStorage.getItem('jwt');
        return this.authHttp.get('http://localhost:8000/api/bucketlists/', {
            headers: headers
        })
            .map(res => res.json());
    }
