import { Pipe, PipeTransform } from '@angular/core';

import { BucketItem } from './bucketitem';

@Pipe({ name: 'doneitems' })
export class DoneItemsPipe implements PipeTransform {
    transform(allitems: BucketItem[]) {
        return allitems.filter(item => item.done==true);
    }
}


