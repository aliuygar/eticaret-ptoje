import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../UserService';
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
pay;
name;
surname;
phone;
addres;
cardNo;
date;
scrNo;
cart;
  constructor(private actRoute: ActivatedRoute, public router: Router,    public afstore: AngularFirestore,
    public service: UserService,public afAuth: AngularFireAuth,) {
      this.cart = this.actRoute.snapshot.paramMap.get('cart');
      console.log(this.cart)
     }

  ngOnInit() {
  }

  payment(){
    const{
      name,
      surname,
      phone,
      addres,
      cardNo,
      date,
      scrNo}=this
try {
  this.afstore.doc(`order/${this.service.getUID()}`).update({
    order: firestore.FieldValue.arrayUnion({
    
    name,
    surname,
    phone,
    addres,
    cardNo,
    date,
    scrNo


    })


  })
} catch (error) {
  
}
this.router.navigate(['/order'])
  }
  viewhome() {
    this.router.navigate(['/shopping-cart'])
  }
}
