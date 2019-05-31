import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from './../UserService';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  addcart: Observable<{}>;
  total;
  sub;
  sum;
  postRefence:AngularFirestoreDocument;
cart;
del=0;
  constructor(private actRoute: ActivatedRoute, public router: Router,
    public afstore: AngularFirestore,
    public service: UserService, ) {
    this.addcart = this.afstore.doc(`cart/${this.service.getUID()}`).valueChanges();;


  }

  ngOnInit() {
this.postRefence=this.afstore.doc(`cart/${this.service.getUID()}`)
this.sub=this.postRefence.valueChanges().subscribe(val=>{
  
  this.cart=val
  
 
})

  }
  viewhome() {
    this.router.navigate(['/home'])
  }
  payment(){
   
    this.router.navigate(['/payment'])
  }
  delete(cart,i){
    
    cart.total-=1;
    this.del +=1;
    console.log(this.postRefence)
     console.log(cart)
     if(cart.total==0){
       cart.total=this.del

       this.postRefence.update({
         cart:firestore.FieldValue.arrayRemove(cart)
        
       })
       this.del=0;
     }
  
   
  }

}
