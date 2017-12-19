import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { App } from 'ionic-angular';

@IonicPage(
  {
    name: 'product-category',
    segment: 'product-category/:slug/:catId'
  }
)
@Component({
  selector: 'product-category',
  templateUrl: 'home.html'
})
export class HomePage {
  slug: any;
  catData: any;
  filteredAttributeData: any;
  searchCat: any;
  title: any;
  // productCat: any;
  loader: any;
  catId: any;
  products: any;
  attResponse: Array<any> = [];
  checkIfNoProducts :boolean= false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public Revmax: Revmax,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public app: App,         
    public popoverCtrl: PopoverController) 
    {
      this.showProducts();
      console.log("in constructor of home");
      this.slug = this.navParams.get("slug");
      this.humanize(this.slug);
  }
  
  /* To show category products on home page */
  showProducts(){
    this.presentLoading();
    this.catData = this.navParams.get("category");
    this.catId = this.navParams.get("catId");
    this.Revmax.fetchCategoryProducts(this.catId);
    this.Revmax.getDataSubject.subscribe((val) => {
      this.products = val.productCategory;
      this.loader.dismiss();
    });  
  }

  /* To humanize the title of the category */
  humanize(str) {
    var frags = str.split('-');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    this.title = frags.join(' ');
  }

  /* Calls when click on the product. Redirects to product detail page. */
  showProductDetail(productId, name){
    console.log('Redirect to product detail page');
    this.navCtrl.push('product-detail',{id: productId});
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

  /* List of categories use in filter */
  searchProductCatData() {
    this.Revmax.fetchSearchedCategories();
    this.Revmax.getDataSubject.subscribe((val) => {
      this.searchCat = val.searchedCategories;
    });
  }

  /* Filter Popover */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('search-products', {
      'category': this.catId,
      'attResponse': this.attResponse ? this.attResponse :[],
    });
    popover.onDidDismiss(data => {
      console.log('popover is closed now');
      console.log(data);
      this.checkIfNoProducts = false;
      if(data != null){
        this.products = data;
        this.attResponse = data.attResponse; 
        this.slug = data.catTitle;
        this.humanize(this.slug); 
      }
      if((data && data.length == 0) || data == null ){
        this.products = [];
        this.checkIfNoProducts = true;
      }
     
      
    });
    popover.present({
      ev: myEvent,
    });
  }

  openCart() {
    this.modalCtrl.create('cart').present();
  }

}
