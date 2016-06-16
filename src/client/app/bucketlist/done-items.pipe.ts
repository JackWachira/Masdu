import { Pipe, PipeTransform } from '@angular/core';

import { BucketItem } from './bucketitem';

@Pipe({ name: 'doneitems',
        pure: false })
export class DoneItemsPipe implements PipeTransform {

    // Displays only the done items
    transform(allitems: BucketItem[]) {
        return allitems.filter(item => item.done==true);
    }
}


