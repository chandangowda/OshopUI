import { Order } from './order';

export class OrderResponse{
    statusCode: number;
    status:boolean;
    statusMessage:string;
    orderData:Order[]

}