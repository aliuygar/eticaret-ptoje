import { UserService } from './../UserService';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userPosts;
  constructor(public afstore:AngularFirestore,public service:UserService) {
    const posts=this.afstore.doc(`users/${this.service.getUID()}`)
    this.userPosts=posts.valueChanges();
     console.log(posts)
   }

  ngOnInit() {
  }

}
