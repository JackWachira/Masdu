import { Pipe, PipeTransform } from '@angular/core';
import { BucketItem } from './bucketitem';
import { DoneItemsPipe } from './done-items.pipe';

@Pipe({
    name: 'undoneitems',
    pure: false
})
export class UnDoneItemsPipe extends DoneItemsPipe {
    transform(allitems: BucketItem[]) {
        return allitems.filter(item => item.done == false);
    }
}
