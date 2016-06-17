import {Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewContainerRef, ViewChild, AfterViewInit} from '@angular/core';
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
import {SearchPipe} from '../bucketlist/search.pipe'
import {AuthHttp, AuthConfig, AUTH_PROVIDERS, JwtHelper} from 'angular2-jwt';
import { MODAL_DIRECTIVES, ModalComponent, ModalResult} from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var jQuery: JQueryStatic;



@Component({
    selector: 'home-page',
    providers: [BucketService, HTTP_PROVIDERS, MODAL_DIRECTIVES, ToastsManager],
    directives: [LoginComponent, MODAL_DIRECTIVES],
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['grid.css'],
    pipes: [DoneItemsPipe, UnDoneItemsPipe, SearchPipe]
})


export class HomeComponent implements OnInit {
    openPage: string;
    editing = false;
    nobuckets = false;
    noitems = false;
    currentTitle: string;
    visible: boolean = false;
    editMode = false;
    index: number = 0;
    bucketname: string;
    private bctlst: Bucketlist[];

    @Input() bucketlist: Bucketlist[];
    @Input() bucketitem: BucketItem[];
    @Input() bucket: Bucketlist;
    @Input() itemcount: number;
    @Input() username: any;
    @Input() email: any;
    @Input() querystring: any;
    @Input() hasItems: boolean = false;
    @Input() public selectedBucket: Bucketlist;
    @Input() public selectdeleteItem: BucketItem;
    @Input() public selectedCurrentText: string;


    constructor(private el: ElementRef, private _router: Router, private bucketService: BucketService, public toastr: ToastsManager) {
        this.openPage = "login";

    }

    @ViewChild('myModal')
    modal: ModalComponent;

    @ViewChild('modalconfirm')
    confirmmodal: ModalComponent;

    @ViewChild('modalconfirmitem')
    confirmmodalitem: ModalComponent;

    @ViewChild('bucketitemid')
    bitemid: any;

    // Executed when modal is closed
    onClose(result: ModalResult) {
        this.createBucketList(this.bucketname);
    }

    // Triggered when searching bucket list
    onKey(value: string) {
        this.querystring = value;
    }

    // Shows search bar when intent to search is triggered
    entersearch(searchinput: HTMLInputElement, searchicon: HTMLInputElement, closeicon: HTMLInputElement) {
        searchinput.style.display = "block";
        searchinput.focus();
        searchicon.style.display = "none";
        closeicon.style.display = "block";
    }

    // Closes search bar
    closesearch(search: HTMLInputElement, searchicon: HTMLInputElement, closeicon: HTMLInputElement) {
        search.style.display = "none";
        searchicon.style.display = "block";
        closeicon.style.display = "none";
        this.querystring = "";
        search.value = "";
    }

    // Opens modal
    open() {
        this.modal.open();
        this.bitemid.nativeElement.value = "";
    }

    ngOnInit(){
        var token = localStorage.getItem('auth_token');
        if (token) {
            this.fetchbuckets();
            this.username = this.getUser()['username'];
            this.email = this.getUser()['email'];
            this.querystring = "";
        }else{
            this._router.navigate(['/']);
        }
    }

    // Navigates user to login page
    logOut(){
        localStorage.removeItem('auth_token');
        this._router.navigate(['/']);
    }

    // Executed when bucketlist is created succesfully
    onCreateBucket(data: any){
        this.fetchbuckets();
    }

    // Calls service to create bucketlists
    createBucketList(bucketname: string){
        this.bucketService.createBucket(bucketname).subscribe(
            data => this.onCreateBucket(data),
            err => this.logError(err),
            () => console.log('Add successful')
        );
    }

    // Calls service to delete bucket item
    deleteItem(){
        var bucketitem = this.selectdeleteItem;
        this.bucketService.deleteItem(this.selectedBucket.id, bucketitem.id).subscribe(
            data => this.fetchbuckets(),
            err => this.logError(err),
            () => console.log('Authentication Complete')
        );
    }

    // Toggles between completed and uncompleted items
    toggle(bucketitem: BucketItem) {
        bucketitem.done = !bucketitem.done;
        this.updateItem(bucketitem, bucketitem.done);
    }
    toggle_done(bucketitem: BucketItem) {
        bucketitem.done = !bucketitem.done;
        this.updateItem(bucketitem, bucketitem.done);
    }

    // Executed when user selects a bucketlist
    onSelect(bucketitem: Bucketlist, i: number) {
        this.visible = false;
        this.itemcount = Object.keys(bucketitem.items).length;
        if(this.itemcount > 0){
            this.noitems = false;
        }else{
            this.noitems = true;
        }
        this.selectedBucket = bucketitem;
        this.index=i;
        console.log(this.selectedBucket);
    }

    // Executed when an error occurs on Api call
    logError(err: any) {
        if(err['status']==403){
            console.log(err['_body']);
            this._router.navigate(['/#']);
        }
    }

    // Gets user name
    getUser(){
        var jwtHelper = new JwtHelper();
        var token = localStorage.getItem('auth_token');
        return jwtHelper.decodeToken(token)
    }

    // Displays completed items label
    showCompleted(element: HTMLInputElement) {
        this.visible = !this.visible;
        if (this.visible){
            element.innerHTML = "HIDE COMPLETED ITEMS";
        }else{
            element.innerHTML = "SHOW COMPLETED ITEMS";
        }
    }

    // Executed when an error occurs on Api call
    onComplete(data: any) {
        console.log(data);
        this.bucketlist = data;
        var num = Object.keys(data).length;
        if (num > 0) {
            this.nobuckets = false;
            this.selectedBucket = this.bucketlist[this.index];
            this.itemcount = Object.keys(this.selectedBucket.items).length;
            if (this.itemcount > 0) {
                this.noitems = false;
            } else {
                this.noitems = true;
            }
        } else {
            this.nobuckets = true;
        }

    }

    // Refreshes bucketlists once a save is made
    onSaveItem(data: any) {
        console.log(data);
        this.fetchbuckets();
    }

    // Calls service to fetch bucketlists
    fetchbuckets(){
        this.bucketService.getBucketLists().subscribe(
            data => this.onComplete(data),
            err => this.logError(err),
            () => console.log('Complete')
        );
    }

    // Dismisses editing interface
    cancelEdit(element: HTMLInputElement, labelitem: HTMLInputElement, bucket: Bucketlist) {
        this.editMode = false;
        element.style.display = "none";
        labelitem.style.display = "block";
        this.selectedBucket = bucket;
    }

    // Commits an edit to bucketitem
    commitEdit(updatedText: string, element: HTMLInputElement, labelitem: HTMLInputElement,bucketitem:BucketItem) {
        this.editMode = false;
        element.style.display = "none";
        labelitem.style.display = "block";
        bucketitem.name = updatedText;
        if (this.selectedCurrentText != updatedText) {
            this.updateItem(bucketitem, bucketitem.done);
        }
    }

    // Calls service to update a bucket
    updateBucket(bucket: Bucketlist, name: string){
        this.bucketService.updateBucket(name, bucket.id).subscribe(
            data => this.onUpdateComplete(data),
            err => this.logError(err),
            () => console.log('Authentication Complete')
        );
    }

    // Commits an edit to bucket list
    commitEditBucketList(updatedText: string, element: HTMLInputElement, labelitem: HTMLInputElement, bucket: Bucketlist) {
        this.editMode = false;
        element.style.display = "none";
        labelitem.style.display = "block";
        bucket.name = updatedText;
        this.selectedBucket = bucket;
        if (this.selectedCurrentText != updatedText) {
            this.updateBucket(bucket, updatedText);
        }
    }

    // Shows interface for editing bucket item
    enterEditMode(element: HTMLInputElement, labelitem: HTMLInputElement, selectedCurrentText: string) {
        console.log(element);
        element.style.display = "block";
        element.focus();
        this.selectedCurrentText = selectedCurrentText;
        labelitem.style.display = "none";
        if (this.editMode) {
            setTimeout(() => { element.focus(); }, 0);
        }
    }

    // Shows interface for editing bucket list

    editModeBucket(element: HTMLInputElement, labelitem: HTMLInputElement, selectedCurrentText: string) {
        console.log(element);
        element.style.display = "block";
        element.focus();
        this.selectedCurrentText = selectedCurrentText;
        labelitem.style.display = "none";
        if (this.editMode) {
            setTimeout(() => { element.focus(); }, 0);
        }
    }

    // Shows confirmation message for deleting an item/bucketlist
    deletetrigger(){
        this.confirmmodal.open();
    }
    deleteitemtrigger(selectdeleteItem: BucketItem) {
        this.selectdeleteItem = selectdeleteItem
        this.confirmmodalitem.open();
    }

    onDeleteBucket(){
        console.log("bucketlist deleted");
        this.fetchbuckets();
    }
    // Calls service to delete bucketlist
    deleteBucketList(){
        this.bucketService.deleteBucket(this.selectedBucket.id).subscribe(
            data => this.onDeleteBucket(),
            err => this.logError(err),
            () => console.log('Complete')
        );
    }

    // Calls service to update bucketitem
    updateItem(item: BucketItem, done: boolean) {
        this.bucketService.updateItem(item.name, this.selectedBucket.id, item.id, done).subscribe(
            data => this.onUpdateComplete(data),
            err => this.logError(err),
            () => console.log('Complete')
        );
    }

    // Refreshes bucketlist once update complete
    onUpdateComplete(data: any){
        this.fetchbuckets();
    }

    // Api call to add a new item
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

    // Hides/Displays nav bar
    togglenav(event:any){
        event.preventDefault();
        jQuery(this.el.nativeElement)
            .find('#wrapper').toggleClass("toggled");
    }
}

