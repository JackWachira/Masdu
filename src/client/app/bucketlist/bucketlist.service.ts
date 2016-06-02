import { Bucketlist } from './bucketlist';
import { bucketlists } from './mockbucketlists';
import { Injectable } from '@angular/core';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BucketService {

    constructor(public http: Http) {

    }
    getBucketLists(): Observable<Bucketlist[]> {

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('http://localhost:8000/api/bucketlists/', {
            headers: headers
        })
            .map(res => res.json());
    }
    saveBucketItem(bid: number, name: string): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('http://localhost:8000/api/bucketlists/' + bid + '/items/', JSON.stringify({ "name": name }), {
            headers: headers})
            .map(res => res.json());
    }
    createBucket(name: string){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('http://localhost:8000/api/bucketlists/', JSON.stringify({ "name": name }), {
            headers: headers
        })
            .map(res => res.json());
    }
    updateItem(name:string ,bid: number, itemid: number, done: boolean): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('http://localhost:8000/api/bucketlists/' + bid + '/items/' + itemid + '/', JSON.stringify({ 'name': name , 'done': done}), {
            headers: headers
        })
            .map(res => res.json());
    }
    deleteItem(bid: number, itemid: number): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('http://localhost:8000/api/bucketlists/' + bid + '/items/' + itemid + '/', {
            headers: headers
        })
            .map(res => res.json());
    }
}
