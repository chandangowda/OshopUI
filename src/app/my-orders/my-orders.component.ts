import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from 'src/model/order';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData:Order[]=[];

  constructor(private orderService: OrderService,private productService:ProductService) { 
    orderService.getOrder().subscribe(res=>{
      this.orderData=res.orderData;
    });
  }

  ngOnInit() {
  }

}
