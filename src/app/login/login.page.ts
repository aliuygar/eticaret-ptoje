import { UserService } from './../UserService';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  kullanici: string = ""
  parola: string = ""
  constructor(public afAuth: AngularFireAuth,
    public menuCtrl:MenuController,
    public alert: AlertController,
    public router: Router,
    public service: UserService,
  ) {this.menuCtrl.enable(false) }

  ngOnInit() {
    
  }
  async login() {
    const { kullanici, parola } = this
    try {
      const sonuc = await this.afAuth.auth.signInWithEmailAndPassword(kullanici, parola)
      //console.log(sonuc)
      if (sonuc.user) {
        this.service.setUser({
          kullanici,
          id: sonuc.user.uid,
        })
      }
      this.router.navigate(['/home'])
    } catch (error) {
      // console.dir(error);
      if (error.code = "auth/invalid-email") {
        this.alertGoster("Hata", "Kullanıcı Bulunamadı")
      }
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
  getRegister(){
    this.router.navigate(['/register'])
  }
}
