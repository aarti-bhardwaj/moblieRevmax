import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppConfigurationProvider as AppConfig } from '../providers/configuration/app-configuration';
import { IonicApp, App, MenuController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  showLevel1 = null;
  showLevel2 = null;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'dashboard';

  pages:any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private appConfig: AppConfig,
    private _app: App, private _ionicApp: IonicApp, private _menu: MenuController
  ) {
    this.parseMenu();
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


}
