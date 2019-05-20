import { Item } from './item';

export class ShoppingCart{
    id:string;
    dateCreated:string;
    items:Item[]

    get totalItemCount(){
       let  count=0;
       this.items.forEach(element=>{
        count+=element.cartCount;
      })
      return count;
    }
}