import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';



/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'dashboard',
    segment: 'dashboard'
  }
)
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  data(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  searchCat: any;
  products: any;
  pages: any;
  response: any;
  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Revmax: Revmax, 
    private appConfig: AppConfig,         
    ) {
    this.dashboard();
    // this.fetchCart();
  }

  dashboard(){
    this.Revmax.fetchCategories();
    this.Revmax.getDataSubject.subscribe((val)=>{
      this.products = val.allCategories;   
      console.log('In dashoard');
      console.log(this.products);   
      });
  }

  showProductDetail(product){
    this.navCtrl.setRoot('product-category', {
      'category': product,
      'slug': product.slug,
      'catId': product.id
    });
  }
  
  fetchCart(){
    this.appConfig.fetchCartItems()
      .subscribe((response) => {
        
        console.log('success in getting cart items');
        console.log(response);
      },
      (error) => {
        console.log('in error');
        console.log('error in getting cart items');
        console.log(error);

      });
  }
  

}
