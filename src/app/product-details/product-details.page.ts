import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../UserService';
import { auth, firestore } from 'firebase/app';
import { empty } from 'rxjs';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  stock: any;
  price: any;
  product: any;
  gender;
  category;
  imgurl1;
  img1;
  imgurl2;
  img2;
  imgurl3;
  img3;
  total:number=1;
  
  constructor(private actRoute: ActivatedRoute, public router: Router,    public afstore: AngularFirestore,
    public service: UserService,public afAuth: AngularFireAuth, ) { }

  ngOnInit() {
    this.price = this.actRoute.snapshot.paramMap.get('price');
    this.stock = this.actRoute.snapshot.paramMap.get('stock');
    this.product = this.actRoute.snapshot.paramMap.get('product');
    this.gender = this.actRoute.snapshot.paramMap.get('gender');
    this.category = this.actRoute.snapshot.paramMap.get('category');
    this.imgurl1 = this.actRoute.snapshot.paramMap.get('imgurl1');
    this.img1 = this.actRoute.snapshot.paramMap.get('img1');
    this.imgurl2 = this.actRoute.snapshot.paramMap.get('imgurl2');
    this.img2 = this.actRoute.snapshot.paramMap.get('img2');
    this.imgurl3 = this.actRoute.snapshot.paramMap.get('imgurl3');
    this.img3 = this.actRoute.snapshot.paramMap.get('img3');

  }
  viewhome() {
    this.router.navigate(['/home'])
  }
  getCart() {
    const{stock,
      price,
      product,
      gender,
      category,
      imgurl1,
      img1,
      total,
    }=this
 
    try {
     
        this.afstore.doc(`cart/${this.service.getUID()}`).update(   {

          cart: firestore.FieldValue.arrayUnion({
     
           stock,
           price,
           product,
           gender,
           category,
           imgurl1,
           img1,
           total,
     
          })
     
         })}

       
     catch (error) {
      console.log(error)
    }

    this.router.navigate(['/shopping-cart'])
    
  }

}
