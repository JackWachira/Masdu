import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { BucketItem } from '../bucketlist/bucketitem';


@Component({
    selector: 'item-component',
    templateUrl: 'app/bucketlist/item.html',
    styleUrls: ['assets/css/item.component.css'],
})
export class ItemComponent implements OnInit {
    @Input() bucketitem: BucketItem;
    editMode = false;
    ngOnInit() {
    }
    constructor(
       private router: Router) {
    }
    enterEditMode(element: HTMLInputElement) {
        // this.selectedItem = item;
        console.log(element);
        this.editMode = true;
        if (this.editMode) {
            setTimeout(() => { element.focus(); }, 0);
        }
    }
}
