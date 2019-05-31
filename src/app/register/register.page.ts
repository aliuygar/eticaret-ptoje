import { Http } from '@angular/http';
import { UserService } from './../UserService';

import { Component, OnInit,ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular'
import { auth, firestore } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  kullanici: string = ""
  parola: string = ""
  tparola: String = ""
  isim: String = ""
  soyisim: String = ""
  telefon: Number
  adres: String = ""
  ImgUrl;
  pname;
  @ViewChild('filebtn') filebtn
  constructor(public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public service: UserService,
    public htt:Http,

  ) { }

  ngOnInit() {
  }
  resimYukle(){
    this.filebtn.nativeElement.click()
  }
  async signup() {

    const { kullanici, parola, tparola, isim, soyisim, telefon, adres} = this
    const resim=this.ImgUrl
    const proname=this.pname
    if (parola !== tparola) {
      return this.alertGoster("Hata", "Parola alanları Aynı Değil")

    }
    else {
      try {
        const sonuc = await this.afAuth.auth.createUserWithEmailAndPassword(kullanici, parola)
        // console.log(sonuc)
        if (sonuc.user) {
          this.afstore.doc(`users/${sonuc.user.uid}`).set(
            {
              username: kullanici,
              profil: firestore.FieldValue.arrayUnion({
                isim,
                soyisim,
                adres,
                telefon,
                resim,
                proname,
                             })

           }
          )
          this.service.setUser({
            kullanici,
            id: sonuc.user.uid,
          })
     
              
        }
        this.router.navigate(['/home'])
      } catch (error) {
        this.alertGoster("Hata", error.message)
      }
    }
    this.afstore.doc(`cart/${this.service.getUID()}`).set(   {

      cart: firestore.FieldValue.arrayUnion({
 
     
      })
 
     })
     try {
      this.afstore.doc(`order/${this.service.getUID()}`).set(   {
        order: firestore.FieldValue.arrayUnion({
      
    
        })
    
    
      })
    } catch (error) {
      
    }
  }
  async alertGoster(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present();
  }
  fileChange(event) {
    const files = event.target.files
    this.pname=files[0].name
    console.log(this.pname)
    console.log(files)
    const data=new FormData()
    data.append('file',files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','c94d746ce64b4c9bb0a0')
    //data.append('UPLOADCARE_SECRET_KEY','c88fd82760eca9d344a7')
    this.htt.post('https://upload.uploadcare.com/base/',data).subscribe(event=>{
      console.log(event)
     
      this.ImgUrl=event.json().file
    
    })
  
  
  }
}
