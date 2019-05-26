import { ShoppingCart } from './shoppingCart';

export class ShoppingCartResponse{
    statusCode: number;
    status:boolean;
    statusMessage:string;
    cartData:ShoppingCart;
}