import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'cart',
    segment: 'cart'
  }
)
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartString: string;
  quantity: any;
  cartItems: any[] = [];
  total: any;
  forsellProducts: any[] = [];
  forcellProductPrice:any;   /* when product is coming from web cart */
  
  showEmptyCartMessage: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public storage: Storage, 
    public viewCtrl: ViewController, private appConfig: AppConfig,
    public loadingCtrl: LoadingController,) {

      /* Clear cart on web */
    // this.appConfig.emptyCart().subscribe((response) => {
    //   console.log("cart is empty");
    //   console.log(response);
    // })

    console.log('in add to cart');
    this.storage.get("cart").then((data) => {
      console.log(data);
      this.total = 0.0;
      this.cartItems = data;
      console.log(this.cartItems);

      if (this.cartItems != null) {
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((item, index) => {
            this.total = this.total + item.amount;
            console.log("this is the total price");
            console.log(this.total);
            if (item.forcell_products) {
              this.total = this.total + (item.forcell_products.product_price * item.quantity);
            }
          })

        } else {
          this.showEmptyCartMessage = true;
        }
      }

    })

  } /* Constructor ends here */

 

  removeFromCart(item, i){ 
    // let price = item.price;
    // let quantity = item.quantity;  
    this.cartItems.splice(i, 1);

    this.total = this.total - item.amount;
    if (item.forcell_products) {
      this.total = this.total - (item.forcell_products.product_price * item.quantity);
    }

    this.storage.set("cart", this.cartItems);

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
    
  }

  addQuantity(item, qty){
    console.log(qty);
    console.log("by addition");
    console.log(item);
    this.storage.get("cart").then((data) => {
      for (let i = 0; i < data.length; i++) {
        
        if (item.product_id == data[i].product_id) {
          // this.total = parseFloat(this.total) - parseFloat(data[i].amount);
          // console.log("Product is already in the cart");
          console.log("total price before adding anything");
          console.log(this.total);
          if(qty == "add"){
            data[i].quantity = data[i].quantity+1 ;
            data[i].amount = data[i].amount + parseFloat(data[i].price);
            this.total = this.total + parseFloat(data[i].price);
            console.log("total price in case of addition");
            console.log(this.total);
          }else{
            if (data[i].quantity == 1){
              data[i].quantity = 1;
            }else{
              data[i].quantity = data[i].quantity - 1;
              data[i].amount = data[i].amount - parseFloat(data[i].price);
              this.total = this.total - parseFloat(data[i].price);
              console.log("total prise in case of substraction");
              console.log(this.total);
            }
          }
          // delete data[i].amount;
          // data[i].amount = parseFloat(data[i].price) * parseFloat(data[i].quantity);
          // this.total = parseFloat(this.total) + parseFloat(data[i].amount);
          console.log("total price before adding foresell product");
          console.log(this.total);
          if (item.forcell_products) {
            if (qty == "add") {
              console.log("In else of forsell products");
              this.total = this.total + parseFloat(data[i].forcell_products.product_price);
              console.log("total after adding forcell");
              console.log(this.total);
            } else {
              if (qty == "sub") {
                if (item.quantity == 1) {
                  /* Do Nothing */
                } else {
                  this.total = this.total - parseFloat(data[i].forcell_products.product_price);
                  console.log("total after subtracting forcell");
                  console.log(this.total);
                }
              }
            }
          }
        }
      }

      this.storage.set("cart", data).then(() => {
        console.log("Quantity Updated");
        this.cartItems = data;
        console.log(data);
      })
     
    })
  }
    
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  checkout(e){
    console.log('hit');
    // e.preventDefault();
    console.log("in checkout");
    this.storage.get("cart").then((data) => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].amount){
          delete data[i].amount;
          delete data[i].forcell_products;
          delete data[i].name;
          delete data[i].image;
          delete data[i].price;
        }
      }
      console.log(data);
      this.cartString = JSON.stringify(data);
      console.log(this.cartString);
      // this.appConfig.emptyCart().subscribe((response) => {
      //   console.log("cart is empty");
      //   console.log(response);
      // })
     
    })
  }

  formSubmit(){
    console.log("In form submit function");
    this.storage.get("cart").then((data) => {
      
      data = [];
      
      this.storage.set("cart", data).then(() => {
        console.log("Data is empty now");
        // this.cartItems = data;
        this.total = 0.00;
        console.log(data);

        let loader = this.loadingCtrl.create({
          content: "Redirecting to cart...",
          duration: 5000
        });
        loader.present();
        this.viewCtrl.dismiss();
      })
    })
  }
}/* Class ends here */
