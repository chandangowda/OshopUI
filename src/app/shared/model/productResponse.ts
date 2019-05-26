import { Product } from './product';

export class ProductResponse{
    statusCode: number;
    status:boolean;
    statusMessage:string;
    productResponseList:Product[]

}