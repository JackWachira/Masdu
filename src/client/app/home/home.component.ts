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
declare var jQuery: JQueryStatic;

@Component({
    selector: 'home-page',
    providers: [BucketService, HTTP_PROVIDERS],
    directives: [LoginComponent],
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['assets/css/grid.css']
})


export class HomeComponent implements OnInit{
    openPage: string;
    editing = false;
    @Input() bucketlist: Bucketlist[];
    @Input() bucketitem: BucketItem[];
    @Input() bucket: Bucketlist;
    @Input() itemcount: number;
    @Input() hasItems: boolean = false;
    currentTitle: string;
    @Input() public selectedBucket: Bucketlist;

    private bctlst:Bucketlist[];
    constructor(private el: ElementRef, private _router: Router, private bucketService: BucketService) {
        this.openPage = "login";
    }
    ngOnInit(){
        this.fetchbuckets();
    }
    onSelect(bucketitem: Bucketlist) {
        this.selectedBucket = bucketitem;
        this.itemcount = Object.keys(bucketitem.items).length;
        console.log(this.selectedBucket);
    }
    logError(err: any) {
        console.log(err);
        if(err['status']==403){
            console.log(err['_body']);
            this._router.navigate(['/']);
        }
    }
    onComplete(data: any) {
        console.log(data["results"]);
        this.bucketlist = data["results"];
        this.selectedBucket = this.bucketlist[0];
    }
    onSaveItem(data: any) {
        console.log(data["results"]);
        this.onSelect(this.selectedBucket);
        this.fetchbuckets();
    }
    fetchbuckets(){
        this.bucketService.getBucketLists().subscribe(
            data => this.onComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
        );
    }
    addItem(itemname: string) {
        // var index=this.bucketlist.indexOf(this.selectedBucket);
        // var item = new BucketItem;
        // item.name = itemname;
        // this.selectedBucket.items.push(item)
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

