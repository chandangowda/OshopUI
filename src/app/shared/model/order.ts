import { Item } from './item';
import { Shipping } from './shipping';

export class Order{
    id:string;
    datePlaced:string;
    shipping:Shipping;
    item:Item[]
}