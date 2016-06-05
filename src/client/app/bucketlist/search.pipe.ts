import { Pipe, PipeTransform } from '@angular/core';
import { Bucketlist } from './bucketlist';
import { DoneItemsPipe } from './done-items.pipe';

@Pipe({
    name: 'searchfilter',
    pure: false
})
export class SearchPipe{
    transform(bucketlist: any, [query]) {
        // console.log(query);
        if (bucketlist == null) {
            return null;
        }
        return bucketlist.filter((item: Bucketlist) => item.name.match(new RegExp(query, "i")));
    }
}
