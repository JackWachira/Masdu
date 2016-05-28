import { BucketItem } from './bucketitem';

export interface Bucketlist {
    id: number;
    name: string;
    items: BucketItem[];
    date_created: string;
    date_modified: string;
    created_by: string;

}
