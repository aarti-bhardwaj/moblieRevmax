import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';

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
  getCartItems: any;
  cartString: string;
  quantity: any;
  cartItems: any[] = [];
  total: any;
  forsellProducts: any[] = [];
  
  showEmptyCartMessage: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public storage: Storage, 
    public viewCtrl: ViewController, private appConfig: AppConfig) {


   console.log(this.getCartItems);

    this.mergeGetCartInStorage();
    console.log("here");
    console.log(typeof this.getCartItems);
     
      
      // this.storage.ready().then(()=>{
      //   this.storage.get("cart").then( (data)=>{
      //     console.log('getting cart data');
      //     console.log(data);
      //     this.cartItems = data;
      //     console.log(this.cartItems);
        
      //     if(this.cartItems != null){
      //         if(this.cartItems.length > 0){
      //           this.cartItems.forEach( (item, index)=> {
      //             this.total = this.total + (item.price * item.quantity)
      //             if (item.forcell_products){
      //               this.total = this.total + (item.forcell_products.product_price * item.quantity);
      //             }
      //           })
        
      //         } else {
      //           this.showEmptyCartMessage = true;
      //         }
      //     }
      //   })
    
      // })


  } /* Constructor ends here */

  mergeGetCartInStorage(){  
      console.log('in add to cart');
      this.storage.get("cart").then((data) => {
        console.log(data);
        this.total = 0.0; 
      //   if (data == null || data.length == 0) {
      //     console.log("when data is null");
      //     console.log(this.getCartItems);
      //     var item;
      //     data = [];
        
      //     for (item in this.getCartItems) {
      //       console.log("pront id");
      //       console.log("this is the cart item");
      //       console.log(item);
      //       console.log(this.getCartItems[item].product_id);
          
      //       if (!this.getCartItems[item].forced_by){

      //         data.push({
      //           // "product": product,
      //           "name": this.getCartItems[item].product_data.post_title,
      //           "quantity": this.getCartItems[item].quantity,
      //           "image": this.getCartItems[item].guid,
      //           "price": this.getCartItems[item].line_total,
      //           "amount": parseFloat(this.getCartItems[item].line_total) * this.getCartItems[item].quantity,
      //           "product_id": this.getCartItems[item].product_data.ID,
      //           "variation_id":  "",
      //           "variation": "",
      //           "forcell_products": this.getCartItems[item].forced_product
      //         })

      //       }
      //     }  

      //     this.storage.set("cart", data).then(() => {
      //       console.log("Cart Updated");
      //       console.log(data);
      //         this.storage.ready().then(()=>{
      //         this.storage.get("cart").then( (data)=>{
      //           console.log('getting cart data');
      //           console.log(data);
      //           this.cartItems = data;
      //           console.log(this.cartItems);
                
      //           if(this.cartItems != null){
      //               if(this.cartItems.length > 0){
      //                 this.cartItems.forEach( (item, index)=> {
      //                   this.total = this.total + item.amount
      //                   console.log("this is the total price");
      //                   console.log(this.total);
      //                   if (item.forcell_products){
      //                     if (item.forcell_products.line_subtotal){
      //                       this.total = this.total + (item.forcell_products.line_total * item.quantity);
      //                     }else{
      //                       this.total = this.total + (item.forcell_products.product_price * item.quantity);
      //                     }
      //                   }
      //                 })
              
      //               } else {
      //                 this.showEmptyCartMessage = true;
      //               }
      //           }
      //           console.log("this is the total outside");
      //           console.log(this.total);
      //         })
          
      //       })
                
  
      //     })
            
      // }else{
            this.cartItems = data;
          console.log(this.cartItems);

          if(this.cartItems != null){
              if(this.cartItems.length > 0){
                this.cartItems.forEach( (item, index)=> {
                  this.total = this.total + (item.price * item.quantity);
                  console.log("this is the total price");
                  console.log(this.total);
                  if (item.forcell_products){
                    if (item.forcell_products.line_subtotal) {
                      this.total = this.total + (item.forcell_products.line_total * item.quantity);
                    } else {
                      this.total = this.total + (item.forcell_products.product_price * item.quantity);
                    }
                    console.log(this.total);
                  }
                })

              } else {
                this.showEmptyCartMessage = true;
              }
          }
      // }

      })
    

  }

  removeFromCart(item, i){ 
    let price = item.price;
    let quantity = item.quantity;  
    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * quantity);
      if (item.forcell_products) {
        if (item.forcell_products.line_subtotal) {
          this.total = this.total - (item.forcell_products.line_total * item.quantity);
        } else {
          this.total = this.total - (item.forcell_products.product_price * item.quantity);
        }
      }

    });

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
          this.total = parseFloat(this.total) - parseFloat(data[i].amount);
          console.log("Product is already in the cart");
          console.log(this.total);
          if(qty == "add"){
            data[i].quantity = data[i].quantity+1 ;
          }else{
            if (data[i].quantity == 1){
              data[i].quantity = 1;
            }else{
              data[i].quantity = data[i].quantity - 1;
            }
          }
          delete data[i].amount;
          data[i].amount = parseFloat(data[i].price) * parseFloat(data[i].quantity);
          this.total = parseFloat(this.total) + parseFloat(data[i].amount);
          console.log(this.total);
          if (item.forcell_products) {
            if (item.forcell_products.line_subtotal) {
              
              if (qty == "add") {
                this.total = this.total + (item.forcell_products.line_total * item.quantity);
              } else {
                if (data[i].quantity == 1) {
                  /* Do Nothing */
                } else {
                  this.total = this.total - (item.forcell_products.line_total * item.quantity);
                }
              }
            } else {
              if (qty == "add") {
                this.total = this.total + (item.forcell_products.product_price * item.quantity);
              } else {
                if (data[i].quantity == 1) {
                  /* Do Nothing */
                } else {
                  this.total = this.total - (item.forcell_products.product_price * item.quantity);
                }
              }
              
            }
            // this.total = this.total - (item.forcell_products.product_price * data[i].quantity);
            // console.log(item.forcell_products.product_price);
            // console.log(qty);
            // this.total = this.total + (item.forcell_products.product_price * data[i].quantity);
            // console.log(this.total);
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
    console.log('hit')
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
      // data = [];

      // this.storage.set("cart", data).then(() => {
      //   console.log("Data is empty now");
      //   this.cartItems = data;
      //   this.total = 0.00;
      //   console.log(data);
      // })
      
      // this.appConfig.emptyCart()
      //   .subscribe((response) => {

      //     console.log('cart is empty');
         
      //   },
      //   (error) => {
      //     console.log('in error');
      //     console.log('error in empty cart');
      //     console.log(error);

      //   });
      console.log("cart is empty now");
     
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
        this.viewCtrl.dismiss();
      })
    })
  }
}/* Class ends here */
