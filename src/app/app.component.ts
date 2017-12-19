import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppConfigurationProvider as AppConfig } from '../providers/configuration/app-configuration';
import { IonicApp, App, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  showLevel1 = null;
  showLevel2 = null;
  getCartItems: any;
  total: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'dashboard';

  pages:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private appConfig: AppConfig,
    private _app: App, private _ionicApp: IonicApp, private _menu: MenuController, public storage: Storage, public modalCtrl: ModalController,
  ) {
    this.parseMenu();
    // this.fetchProductsfromWebCart();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.setupBackButtonBehavior (); /* Back button compatability */
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(category) {
    console.log('here in open page');
    this.nav.setRoot('product-category',{
      'category': category,
      'slug': category.attr,
      'catId': category.object_id,
    });
 
  }

  home(){
    this.nav.setRoot('dashboard');
  }

  openCart() {
    this.modalCtrl.create('cart').present();
  }

  parseMenu(){
    this.appConfig.fetchMenuItems()
    .subscribe((response) => {
         this.pages = response.items;
    },
    (error)=> {
      console.log('error in parseMenu');
      console.log(error);
    });
  }


  getPageComponent(pageTitle){
    var componentName:string= null;
    switch(pageTitle){
      case 'Home': 
      componentName = 'HomePage';
      break;
      default: 
      componentName = 'ListPage';
      break;
    }
    return componentName;
  }
  toggleLevel1(idx) {
  if (this.isLevel1Shown(idx)) {
    this.showLevel1 = null;
  } else {
    this.showLevel1 = idx;
  }
};
toggleLevel2(idx) {
  if (this.isLevel2Shown(idx)) {
    this.showLevel1 = null;
    this.showLevel2 = null;
  } else {
    this.showLevel1 = idx;
    this.showLevel2 = idx;
  }
};
isLevel1Shown(idx) {
  return this.showLevel1 === idx;
};

isLevel2Shown(idx) {
  return this.showLevel2 === idx;
};

helpfulLinks(){
  this.nav.setRoot('helpful-links');
}

fetchProductsfromWebCart(){
  this.appConfig.fetchCartItems()
    .subscribe((response) => {

      console.log('success in getting cart items');
      console.log(response);
      console.log(typeof response);

      this.getCartItems = response;
      if (this.getCartItems) {
        this.storage.get("cart").then((data) => {
          console.log(data);
          this.total = 0.0;
          // if (data == null || data.length == 0) {
          console.log("when data is null");
          console.log(this.getCartItems);
          var item;
          data = [];

          for (item in this.getCartItems) {
            console.log("pront id");
            console.log("this is the cart item");
            console.log(item);
            console.log(this.getCartItems[item].product_id);

            if (!this.getCartItems[item].forced_by) {

              data.push({
                // "product": product,
                "name": this.getCartItems[item].product_data.post_title,
                "quantity": this.getCartItems[item].quantity,
                "image": this.getCartItems[item].guid,
                "price": this.getCartItems[item].line_total,
                "amount": parseFloat(this.getCartItems[item].line_total) * this.getCartItems[item].quantity,
                "product_id": this.getCartItems[item].product_data.ID,
                "variation_id": "",
                "variation": "",
                "forcell_products": this.getCartItems[item].forced_product
              })

            }
          }
          // }
          this.storage.set("cart", data).then(() => {
            console.log("Cart Updated");
            this.storage.get("cart").then((data) => {
              console.log(data);
            })

          })
        })
      }

    },
    (error) => {
      console.log('in error');
      console.log('error in getting cart items');
      console.log(error);

    });
}


}
