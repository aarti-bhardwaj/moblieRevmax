import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';

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
  products: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Revmax: Revmax       
    ) {
    this.dashboard();
    
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
  
  

}
