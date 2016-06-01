import { Pipe, PipeTransform } from '@angular/core';

import { BucketItem } from './bucketitem';

@Pipe({ name: 'doneitems',
        pure: false })
export class DoneItemsPipe implements PipeTransform {
    transform(allitems: BucketItem[]) {
        // console.log("pipe done called");
        // console.log(allitems.filter(item => item.done==true));
        return allitems.filter(item => item.done==true);
    }
}


