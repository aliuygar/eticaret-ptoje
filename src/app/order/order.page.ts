import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from './../UserService';
import { firestore } from 'firebase/app';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
getorder:Observable<{}>;
  constructor(private actRoute: ActivatedRoute, public router: Router,
    public afstore: AngularFirestore,
    public service: UserService, ) {
    this.getorder = this.afstore.doc(`order/${this.service.getUID()}`).valueChanges();;
    }

  ngOnInit() {
  }
  viewhome() {
    this.router.navigate(['/home'])
  }
}
