import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profil',
      url: '/profile',
      icon: 'contact'
    }, 
    {
      title: 'Ürün Ekle',
      url: '/uploader',
      icon: 'add'
    },{
      title: 'Sepetim',
      url: '/shopping-cart',
      icon: 'cart'
    }, {
      title: 'Siparişlerim',
      url: '/order',
      icon: 'card'
    }, {
      title: 'Çıkış',
      url: '/login',
      icon: 'exit'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
