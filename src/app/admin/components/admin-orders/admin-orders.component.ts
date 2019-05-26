import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/model/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orderData:Order[]=[];

  constructor(private orderService: OrderService) { 
    orderService.getAllOrder().subscribe(res=>{
      this.orderData=res.orderData;
    });
  }

  ngOnInit() {
  }

}
