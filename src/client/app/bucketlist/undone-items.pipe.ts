import { Pipe, PipeTransform } from '@angular/core';

import { DoneItemsPipe } from './done-items.pipe';

@Pipe({
    name: 'undoneitems',
})
export class UnDoneItemsPipe extends DoneItemsPipe {
    transform(allitems: BucketItem[]) {
        return allitems.filter(item => item.done == false);
    }
}
