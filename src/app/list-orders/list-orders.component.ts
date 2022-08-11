import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getOrders();
  }

  orders:any;

  getOrders(){
    const url = "http://localhost:3000/orders";

    this.http.get(url).subscribe((res:any)=>{
      this.orders = res;

    })
  }
  deliverOrder(order:any){
    // alert("Order status changed to delivered" + order.id)
  
    const url ="http://localhost:3000/orders/" +order.id;
    const orderObj={
      id: order.id,
      status:"Delevered"
    };
    this.http.patch(url,orderObj).subscribe((res:any)=>{
      console.log(res);
      alert("order status changed to delevered" + order.id);    
    });
  
  }
  cancelOrder(order:any){
    // alert("Order is canceled" + order.id)
    const url ="http://localhost:3000/orders/" +order.id;
    const orderObj={
      id: order.id,
      status:"CANCELLED"
    };
    this.http.patch(url,orderObj).subscribe((res:any)=>{
      console.log(res);
      alert("order is cancled" + order.id);    
    });
  
  }
}
