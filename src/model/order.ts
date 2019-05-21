import { Item } from './item';

export class Order{
    id:string;
    datePlaced:string;
    shipping:string;
    item:Item[]
}