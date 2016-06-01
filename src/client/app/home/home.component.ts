import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/signup/signup.component';
import { Router } from '@angular/router';
import { BucketService } from '../bucketlist/bucketlist.service';
import { Bucketlist } from '../bucketlist/bucketlist';
import { BucketItem } from '../bucketlist/bucketitem';
import { HTTP_PROVIDERS } from '@angular/http';
import {CanActivate} from '@angular/router-deprecated';
import {DoneItemsPipe} from '../bucketlist/done-items.pipe'
import {UnDoneItemsPipe} from '../bucketlist/undone-items.pipe'
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';
declare var jQuery: JQueryStatic;



@Component({
    selector: 'home-page',
    providers: [BucketService, HTTP_PROVIDERS],
    directives: [LoginComponent],
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['assets/css/grid.css'],
    pipes: [DoneItemsPipe,UnDoneItemsPipe]
})


export class HomeComponent implements OnInit{
    openPage: string;
    editing = false;
    @Input() bucketlist: Bucketlist[];
    @Input() bucketitem: BucketItem[];
    @Input() bucket: Bucketlist;
    @Input() itemcount: number;
    @Input() username: any;
    @Input() hasItems: boolean = false;
    currentTitle: string;
    @Input() public selectedBucket: Bucketlist;
    visible: boolean = false;
    editMode = false;
    index: number=0;

    private bctlst:Bucketlist[];
    constructor(private el: ElementRef, private _router: Router, private bucketService: BucketService) {
        this.openPage = "login";
    }
    ngOnInit(){
        // this.bucketService.getBucketLists().subscribe(
        //     data => this.onInitComplete(data),
        //     err => this.logError(err),
        //     () => console.log('Authentication Complete')
        // );
        this.fetchbuckets();
        this.username = this.getUser()['username'];
    }
    toggle(bucketitem: BucketItem) {
        bucketitem.done = !bucketitem.done;
        this.updateItem(bucketitem, bucketitem.done);
    }
    toggle_done(bucketitem: BucketItem) {
        bucketitem.done = !bucketitem.done;
        this.updateItem(bucketitem, bucketitem.done);
    }
    onSelect(bucketitem: Bucketlist, i: number) {
        this.visible = false;
        this.selectedBucket = bucketitem;
        this.itemcount = Object.keys(bucketitem.items).length;
        this.index=i;
        console.log(this.selectedBucket);
    }
    logError(err: any) {
        console.log(err);
        if(err['status']==403){
            console.log(err['_body']);
            this._router.navigate(['/']);
        }
    }
    getUser(){
        var jwtHelper = new JwtHelper();
        var token = localStorage.getItem('auth_token');
        return jwtHelper.decodeToken(token)
    }
    showCompleted(){
        this.visible = !this.visible;
    }
    onComplete(data: any) {
        this.bucketlist = data["results"];
        this.selectedBucket = this.bucketlist[this.index];
        this.itemcount = Object.keys(this.selectedBucket.items).length;
    }
    onInitComplete(data: any){
        this.bucketlist = data["results"];
        console.log(this.bucketlist);
        console.log("start select");
        console.log(this.selectedBucket);
        var index = this.bucketlist.indexOf(this.selectedBucket);
        console.log(index);
        this.selectedBucket = this.bucketlist[0];
        console.log(this.selectedBucket);
        console.log("end select");

        this.onSelect(this.selectedBucket);
    }
    onSaveItem(data: any) {
        console.log(data);
        this.fetchbuckets();
    }
    fetchbuckets(){
        this.bucketService.getBucketLists().subscribe(
            data => this.onComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
        );
    }
    enterEditMode(element: HTMLInputElement) {
        console.log(element);
        this.editMode = true;
        if (this.editMode) {
            setTimeout(() => { element.focus(); }, 0);
        }
    }
    updateItem(item: BucketItem, done: boolean) {
        this.bucketService.updateItem(item.name, this.selectedBucket.id, item.id, done).subscribe(
            data => this.onUpdateComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
        );
    }
    onUpdateComplete(data: any){
        console.log(data);
        this.fetchbuckets();
        // this.onSelect(this.selectedBucket);
    }
    addItem(itemname: string,element: HTMLInputElement) {
        element.value="";
        var token = localStorage.getItem('auth_token');
        if (token){
            this.bucketService.saveBucketItem(this.selectedBucket.id, itemname).subscribe(
                data => this.onSaveItem(data),
                err => this.logError(err),
                () => console.log('Add successful')
            );
        }
    }
    editCard() {
        this.editing = true;
        this.currentTitle = this.bucket.name;
        let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];
        setTimeout(function() {
            textArea.focus();
        }, 0);
    }
    togglenav(event:any){
        event.preventDefault();
        jQuery(this.el.nativeElement)
            .find('#wrapper').toggleClass("toggled");
    }
    blurOnEnter(event:any) {
        if (event.keyCode === 13) {
            event.target.blur();
        } else if (event.keyCode === 27) {
            this.bucket.name = this.currentTitle;
            this.editing = false;
        }
    }
    updateCard() {
        if (!this.bucket.name || this.bucket.name.trim() === '') {
            this.bucket.name = this.currentTitle;
        }
        this.editing = false;
    }
}

