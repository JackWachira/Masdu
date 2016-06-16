import { Pipe, PipeTransform } from '@angular/core';
import { Bucketlist } from './bucketlist';
import { DoneItemsPipe } from './done-items.pipe';

@Pipe({
    name: 'searchfilter',
    pure: false
})
export class SearchPipe{

    // Retuns bucket list matching query
    transform(bucketlist: any, [query]) {
        if (bucketlist == null) {
            return null;
        }
        return bucketlist.filter((item: Bucketlist) => item.name.match(new RegExp(query, "i")));
    }
}
