import { Component, OnInit } from '@angular/core';
import { auth, firestore } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../UserService';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Http } from '@angular/http';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {
  price: number;
  stock: number;
  productName: string;
  imgurl1: string;
  img1;
  imgurl2: string;
  img2;
  imgurl3: string;
  img3;
  category: string;
  gender: string;


  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public afstore: AngularFirestore,
    public service: UserService,
    public htt: Http,

  ) { }

  ngOnInit() {
  }

  productAdd() {

    const { price, stock, productName, category, gender } = this
    const imgurl1 = this.imgurl1
    const img1 = this.img1
    const imgurl2 = this.imgurl2
    const img2 = this.img2
    const imgurl3 = this.imgurl3
    const img3 = this.img3

    try {
      this.afstore.doc(`products/${this.service.getpId()}`).update(
        {
          product: firestore.FieldValue.arrayUnion({
            price,
            stock,
            product: productName,
            category,
            gender,
            imgurl1,
            img1,
            imgurl2,
            img2,
            imgurl3,
            img3,

          })
        })



    } catch (error) {
      console.log(error)
    }




  }


  fileChange(event) {
    const files = event.target.files
    this.img1 = files[0].name

    console.log(this.img1)
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])

    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'c94d746ce64b4c9bb0a0')
    //data.append('UPLOADCARE_SECRET_KEY','c88fd82760eca9d344a7')
    this.htt.post('https://upload.uploadcare.com/base/', data).subscribe(event => {
      console.log(event)

      this.imgurl1 = event.json().file

    })


  }
  fileChange1(event) {
    const files = event.target.files
    this.img2 = files[0].name

    console.log(this.img2)
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])

    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'c94d746ce64b4c9bb0a0')
    //data.append('UPLOADCARE_SECRET_KEY','c88fd82760eca9d344a7')
    this.htt.post('https://upload.uploadcare.com/base/', data).subscribe(event => {
      console.log(event)

      this.imgurl2 = event.json().file

    })


  }
  fileChange2(event) {
    const files = event.target.files

    this.img3 = files[0].name
    console.log(this.img3)
    console.log(files)
    const data = new FormData()
    data.append('file', files[0])

    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'c94d746ce64b4c9bb0a0')
    //data.append('UPLOADCARE_SECRET_KEY','c88fd82760eca9d344a7')
    this.htt.post('https://upload.uploadcare.com/base/', data).subscribe(event => {
      console.log(event)


      this.imgurl3 = event.json().file
    })


  }
}

