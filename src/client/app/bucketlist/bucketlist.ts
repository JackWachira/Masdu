import { BucketItem } from './bucketitem';

export interface Bucketlist {
  id: number;
  name: string;
  items: BucketItem[];
  date_created: string;
  date_updated: string;
  user_id: string;

}
