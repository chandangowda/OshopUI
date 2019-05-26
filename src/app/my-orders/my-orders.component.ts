import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/model/order';
import { ProductService } from 'src/app/shared/services/product.service';

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
