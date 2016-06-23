import { Bucketlist } from './bucketlist';
import { Injectable } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BucketService {

  constructor(public http: Http) {

  }

  // Api call to fetch all bucketlists

  getBucketLists(): Observable<Bucketlist[]> {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.get('https://masduapi.herokuapp.com/api/bucketlists/', {
      headers: headers
    })
      .map(res => res.json());
  }

  // Api call to save bucket item
  saveBucketItem(bid: number, name: string): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.post('https://masduapi.herokuapp.com/api/bucketlists/' + bid + '/items/', JSON.stringify({ "name": name }), {
      headers: headers
    })
      .map(res => res.json());
  }

  // Api call to create a bucket
  createBucket(name: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.post('https://masduapi.herokuapp.com/api/bucketlists/', JSON.stringify({ "name": name }), {
      headers: headers
    })
      .map(res => res.json());
  }

  // Api call to update a bucket item details
  updateItem(name: string, bid: number, itemid: number, done: boolean): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.put('https://masduapi.herokuapp.com/api/bucketlists/' + bid + '/items/' + itemid + '/', JSON.stringify({ 'name': name, 'done': done }), {
      headers: headers
    })
      .map(res => res.json());
  }

  // Api call to update bucket details
  updateBucket(name: string, bid: number): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.put('https://masduapi.herokuapp.com/api/bucketlists/' + bid + '/', JSON.stringify({ 'name': name }), {
      headers: headers
    })
      .map(res => res.json());
  }

  // APi call to delete bucket item
  deleteItem(bid: number, itemid: number): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.delete('https://masduapi.herokuapp.com/api/bucketlists/' + bid + '/items/' + itemid + '/', {
      headers: headers
    })
      .map(res => res.json());
  }

  // Api call to delete a bucket
  deleteBucket(bid: number): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
    return this.http.delete('https://masduapi.herokuapp.com/api/bucketlists/' + bid + '/', {
      headers: headers
    })
      .map(res => res.json());
  }
}
