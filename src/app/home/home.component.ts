import {Component, ElementRef, Input} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/signup/signup.component';
import { Router } from 'angular2/router';
import { BucketService } from '../bucketlist/bucketlist.service';
import { Bucketlist } from '../bucketlist/bucketlist';

@Component({
    selector: 'home-page',
    providers: [BucketService],
    directives: [LoginComponent],
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['assets/css/grid.css']
})

export class HomeComponent {
    openPage: string;
    editing = false;
    @Input() bucketlist: Bucketlist[];
    @Input() bucket: Bucketlist;
    @Input() hasItems: boolean=false;
    currentTitle: string;
    constructor(private el: ElementRef,private _router: Router, private bucketService: BucketService) {
        this.openPage = "login";
        let bucketitem = {"id": 1, "name": "Tour Msa", "date_created": "23/Mar/16","date_modified": "23/Mar/16", "done": true}
        this.bucket = { "id": 1, "name": "Travel", "items": bucketitem, "date_created": "Mr. Nice", "date_modified": "", "created_by": "" }
        this.getHeroes();

    }
    getHeroes() {
        this.bucketService.getBucketlists().then(bucketlist => {
            this.bucketlist = bucketlist;
            console.log(this.bucket.name);

            if (this.bucketlist.length > 0) {
                // this.bucket = bucketlist[0];
                this.hasItems = true;
            }
        });
    }
    editCard() {
        this.editing = true;
        this.currentTitle = this.bucket.name;
        let textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];
        setTimeout(function() {
            textArea.focus();
        }, 0);
    }
    blurOnEnter(event) {
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
        // this._cardService.put(this.card).then(res => {
        //     this._ws.updateCard(this.card.boardId, this.card);
        // });
        this.editing = false;
    }
}

