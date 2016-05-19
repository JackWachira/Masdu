import { Bucketlist } from './bucketlist';
import { bucketlists } from './mockbucketlists';
import { Injectable } from '@angular/core';

@Injectable()
export class BucketService {
  getBucketlists() {
    return Promise.resolve(bucketlists);
  }

  // getHero(id: number) {
  //   return Promise.resolve(Bucketlist).then(
  //     heroes => heroes.filter(hero => hero.id === id)[0]
  //   );
  // }
}
