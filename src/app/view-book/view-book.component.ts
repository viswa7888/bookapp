import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  id!:number;



  constructor(private route:ActivatedRoute, private http:HttpClient){
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    console.log("View Book:" + this.id);
    this.getBook();
  }

  book: any;

  getBook(){
    const url = "http://localhost:3000/books/" +this.id;
    this.http.get(url).subscribe((res:any)=>{
    this.book = res;
    });

  }

  addToCart(book:any){
    console.log("Placing an order", book);
    alert("Order Placed");
    
    let Quantity = 1;
    let totalPrice = book.price*Quantity

    let orderObj={
      item_name : book.title + "-" + book.isbn + "-" +book.id,
      Quantity: Quantity,
      totalPrice: totalPrice,
      ordered_date:new Date().toJSON(),
      status:"ORDERED"
    };

    console.log(orderObj);

    const url = "http://localhost:3000/orders";
    this.http.post(url,orderObj).subscribe((res:any)=>{
    console.log(res)
    alert("Successfully Placed an Order");
    });

}
}
