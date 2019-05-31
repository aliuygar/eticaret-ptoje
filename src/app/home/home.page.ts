import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../UserService';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: Observable<{}>;;

  constructor(
    public menuCtrl: MenuController,
    public afstore: AngularFirestore,
    public service: UserService,
    private router: Router, ) {
    this.menuCtrl.enable(true)
    this.products = this.afstore.doc(`products/${this.service.getpId()}`).valueChanges();;


    console.log(this.products)

  }
  getDetails(products) {
    this.router.navigate(['/product-details', {
      'product': products.product, 'price': products.price,
      'stock': products.stock, 'gender': products.gender,
      'imgurl1': products.imgurl1, 'img1': products.img1,
      'imgurl2': products.imgurl2, 'img2': products.img2,
      'imgurl3': products.imgurl3, 'img3': products.img3,
      'category': products.category,
    }])
  }

}
