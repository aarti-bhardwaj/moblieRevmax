import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'product-detail',
    segment: 'product-detail/:id'
  }
)
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  variationId: any;
  productCat: any;
  updatedPrice: any;
  instalationIns: string;
  loader: any;
  variationsData: Array<any> =[];
  productName:any;
  public productId;
  public product;
  header: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public Revmax: Revmax, 
     public loadingCtrl: LoadingController,
     public storage: Storage, 
     public toastCtrl: ToastController, 
     public modalCtrl: ModalController,
     private appConfig: AppConfig
    ) {
    this.productId = this.navParams.get("id");
    this.productCat = this.navParams.get("productCat");
    console.log(this.productId);
    this.showProductDetails();
  }

  showProductDetails(){
    this.presentLoading();
    this.Revmax.products = {};
    this.Revmax.fetchProductInfo(this.productId);
    // this.product = this.Revmax.products.productInfo;
    // console.log('here are the products'); 
    // console.log(this.product);

    if(this.productId == null){
      // this.product = this.Revmax.products.productInfo;
      // this.header =  'description';
      this.loader.dismiss();
    }
    else{
      console.log('in else');
      this.Revmax.getDataSubject.subscribe((val)=>{
        console.log('in subs of product detail');      
        console.log(val);
        this.product = val.productInfo; 
        this.instalationIns = this.product.short_description;   
        this.header =  'description'; 
        this.productName = this.product.slug;
        this.loader.dismiss(); 
      });
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }


  addCart(){
    console.log('In add to cart function');
    console.log(this.variationsData);

    console.log(this.variationsData.length);
    if(this.variationId != null && typeof this.variationId != "undefined"){
      console.log('In if');
      this.appConfig.addToCartVariation(this.productCat, this.productId, this.variationsData, this.variationId)
      .subscribe((response) => {
        console.log('Cart added in case of variations');
        console.log(response);
        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();
      },
      (error)=> {
        console.log('error in parseMenu');
       
      });
    }else{
      console.log('In else');
      this.appConfig.addToCart(this.productCat, this.productId)
      .subscribe((response) => {
        console.log('Cart added with no variations');
        console.log(response);
        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();
      },
      (error)=> {
        console.log('error in parseMenu');
       
      });
    }
  }

  // addToCart(product) {

    // console.log('in add to cart');
    //     this.storage.get("cart").then((data) => {
    
    //       if (data == null || data.length == 0) {
    //         data = [];
    
    //         data.push({
    //           "product": product,
    //           "qty": 1,
    //           "amount": parseFloat(product.price)
    //         })
    //       } else {
    
    //         let added = 0;
    
    //         for (let i = 0; i < data.length; i++) {
    
    //           if (product.id == data[i].product.id) {
    //             let qty = data[i].qty;
    
    //             console.log("Product is already in the cart");
    
    //             data[i].qty = qty + 1;
    //             data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
    //             added = 1;
    //           }
    
    //         }

    //         if (added == 0) {
    //           data.push({
    //             "product": product,
    //             "qty": 1,
    //             "amount": parseFloat(product.price)
    //           })
    //         }
    
    //       }
    
    //       this.storage.set("cart", data).then(() => {
    //         console.log("Cart Updated");
    //         console.log(data);
    
    //         this.toastCtrl.create({
    //           message: "Cart Updated",
    //           duration: 3000
    //         }).present();
    
    //       })
    //     })
       
      // }
  // }
    
      openCart(){
        this.modalCtrl.create('cart').present();
      }

      installationInstructions(){
        this.modalCtrl.create('installations', {
          'instructions':this.instalationIns
        }).present();
      }

      getProductVariations(){
        console.log('In getting variation data');
        console.log(this.variationsData);
        console.log(this.productName);
        this.appConfig.getProductVariation(this.variationsData, this.productName, this.productId)
        .subscribe((response) => {
          console.log('in success');
          this.updatedPrice = response.price_html;
          this.variationId = response.variation_id;
          // this.product.price = response.price_html;
          console.log('success in getting variations for this product');
             console.log(response);
        },
        (error)=> {
          console.log('in error');          
          console.log('error in getting variations for this product');
          console.log(error);
          
        });
      }

}
