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
    bucketlist_data: any;
    constructor(
        public authHttp: AuthHttp) {
    }

  getBucketlists() {
    // return Promise.resolve(bucketlists);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token ' + localStorage.getItem('jwt'));
    this.authHttp.get('http://localhost:8000/api/bucketlists/', {
        headers: headers
    })
        .map(res => res.json())
        .subscribe(
        data => this.onComplete(data),
        err => this.logError(err),
        () => console.log('Authentication Complete')
        );
    return Promise.resolve(this.bucketlist_data);
  }
  logError(err: any) {
      console.log(err["_body"])
      this.bucketlist_data = err["_body"];
  }
  onComplete(data: any) {
      console.log(data)
      this.bucketlist_data = data;
  }
