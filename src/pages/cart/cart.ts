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
    this.getCartItems = {
      "f8ab4d26564587d455f19dd6b87def3f": {
        "0": false,
        "product_id": 8490,
        "variation_id": 8492,
        "variation": "",
        "quantity": 1,
        "line_total": 4195,
        "line_subtotal": 4195,
        "line_tax": 0,
        "line_subtotal_tax": 0,
        "line_tax_data": {
          "total": [],
          "subtotal": []
        },
        "data": {
          "post_type": "product_variation"
        },
        "product_data": {
          "ID": 8492,
          "post_author": "5",
          "post_date": "2017-02-03 23:37:31",
          "post_date_gmt": "2017-02-03 23:37:31",
          "post_content": "",
          "post_title": "Dodge Rebuilt 48RE Signature Series Transmission",
          "post_excerpt": "",
          "post_status": "publish",
          "comment_status": "closed",
          "ping_status": "closed",
          "post_password": "",
          "post_name": "product-8490-variation",
          "to_ping": "",
          "pinged": "",
          "post_modified": "2017-02-06 09:52:46",
          "post_modified_gmt": "2017-02-06 09:52:46",
          "post_content_filtered": "",
          "post_parent": 8490,
          "guid": "https:\/\/revmaxconverters.com\/product\/dodge-rebuilt-48re-signature-series-transmission\/",
          "menu_order": 0,
          "post_type": "product_variation",
          "post_mime_type": "",
          "comment_count": "0",
          "filter": "raw"
        },
        "forced_product": {
          "forced_by": "f8ab4d26564587d455f19dd6b87def3f",
          "product_id": 5260,
          "variation_id": 0,
          "variation": "",
          "quantity": 1,
          "line_total": 1500,
          "line_subtotal": 1500,
          "line_tax": 0,
          "line_subtotal_tax": 0,
          "line_tax_data": {
            "total": [],
            "subtotal": []
          },
          "data": {
            "ID": 5260,
            "post_author": "1",
            "post_date": "2016-08-05 04:43:06",
            "post_date_gmt": "2016-08-05 04:43:06",
            "post_content": "What is a Core Charge?\r\nA \u201cCore Charge\u201d is similar to the deposit you might pay for a can or bottle of soda. In many states, to promote recycling, you are charged a deposit when you purchase a can of soda and you receive your deposit back when you return the empty can. Many automotive parts have a Core Charge, or Core Price, that works the same way as a soda can deposit.\r\n\r\nHere\u2019s how the Core Charge works:\r\n<ul>\r\n \t<li>The part you are purchasing contains a component that is recyclable<\/li>\r\n \t<li>The Core Charge deposit is charged at the time of purchase<\/li>\r\n \t<li>When the recyclable component from your old part is returned to us, the charge is refunded to you<\/li>\r\n<\/ul>\r\nTo receive your Core Charge refund, you can do either of the following:\r\n<ul>\r\n \t<li>Bring the part to any RevMax Parts store along with your receipt or packing slip<\/li>\r\n \t<li>Mail the part back to RevMax Auto Parts following the directions on your packing slip<\/li>\r\n \t<li>Please see our Returns policy for more information on returning a core item.<\/li>\r\n<\/ul>\r\nCore Charges are often mandated by state legislature, and, as such, the actual core charge and taxes on the charge may vary depending on the state in which you buy your part.",
            "post_title": "Refundable Core Charge ($1,500)",
            "post_excerpt": "",
            "post_status": "publish",
            "comment_status": "closed",
            "ping_status": "closed",
            "post_password": "",
            "post_name": "refundable-core-charge-1500",
            "to_ping": "",
            "pinged": "",
            "post_modified": "2017-06-13 06:23:18",
            "post_modified_gmt": "2017-06-13 10:23:18",
            "post_content_filtered": "",
            "post_parent": 0,
            "guid": "https:\/\/revmaxconverters.com\/?post_type=product&#038;p=5260",
            "menu_order": 0,
            "post_type": "product",
            "post_mime_type": "",
            "comment_count": "0",
            "filter": "raw"
          }
        }
      },
      "785f69b25fc35a73e8cc78e45ce1e0b5": {
        "forced_by": "f8ab4d26564587d455f19dd6b87def3f",
        "product_id": 5260,
        "variation_id": 0,
        "variation": "",
        "quantity": 1,
        "line_total": 1500,
        "line_subtotal": 1500,
        "line_tax": 0,
        "line_subtotal_tax": 0,
        "line_tax_data": {
          "total": [],
          "subtotal": []
        },
        "data": {},
        "product_data": {
          "ID": 5260,
          "post_author": "1",
          "post_date": "2016-08-05 04:43:06",
          "post_date_gmt": "2016-08-05 04:43:06",
          "post_content": "What is a Core Charge?\r\nA \u201cCore Charge\u201d is similar to the deposit you might pay for a can or bottle of soda. In many states, to promote recycling, you are charged a deposit when you purchase a can of soda and you receive your deposit back when you return the empty can. Many automotive parts have a Core Charge, or Core Price, that works the same way as a soda can deposit.\r\n\r\nHere\u2019s how the Core Charge works:\r\n<ul>\r\n \t<li>The part you are purchasing contains a component that is recyclable<\/li>\r\n \t<li>The Core Charge deposit is charged at the time of purchase<\/li>\r\n \t<li>When the recyclable component from your old part is returned to us, the charge is refunded to you<\/li>\r\n<\/ul>\r\nTo receive your Core Charge refund, you can do either of the following:\r\n<ul>\r\n \t<li>Bring the part to any RevMax Parts store along with your receipt or packing slip<\/li>\r\n \t<li>Mail the part back to RevMax Auto Parts following the directions on your packing slip<\/li>\r\n \t<li>Please see our Returns policy for more information on returning a core item.<\/li>\r\n<\/ul>\r\nCore Charges are often mandated by state legislature, and, as such, the actual core charge and taxes on the charge may vary depending on the state in which you buy your part.",
          "post_title": "Refundable Core Charge ($1,500)",
          "post_excerpt": "",
          "post_status": "publish",
          "comment_status": "closed",
          "ping_status": "closed",
          "post_password": "",
          "post_name": "refundable-core-charge-1500",
          "to_ping": "",
          "pinged": "",
          "post_modified": "2017-06-13 06:23:18",
          "post_modified_gmt": "2017-06-13 10:23:18",
          "post_content_filtered": "",
          "post_parent": 0,
          "guid": "https:\/\/revmaxconverters.com\/?post_type=product&#038;p=5260",
          "menu_order": 0,
          "post_type": "product",
          "post_mime_type": "",
          "comment_count": "0",
          "filter": "raw"
        }
      }
    };
    this.mergeGetCartInStorage();
    console.log("here");
    console.log(typeof this.getCartItems);
    console.log(this.getCartItems);
     
      
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
        if (data == null || data.length == 0) {
          
          var item;
          data = [];
          for (item in this.getCartItems) {
            console.log("pront id");
            console.log(this.getCartItems[item].product_id);
          
            if (!this.getCartItems[item].forced_by){

              data.push({
                // "product": product,
                "name": this.getCartItems[item].product_data.post_title,
                "quantity": this.getCartItems[item].quantity,
                "image": this.getCartItems[item].guid,
                "price": this.getCartItems[item].line_total,
                "amount": parseFloat(this.getCartItems[item].line_total) * this.getCartItems[item].quantity,
                "product_id": this.getCartItems[item].product_data.ID,
                "variation_id":  "",
                "variation": "",
                "forcell_products": this.getCartItems[item].forced_product
              })

            }
          }  

          this.storage.set("cart", data).then(() => {
            console.log("Cart Updated");
            console.log(data);
              this.storage.ready().then(()=>{
              this.storage.get("cart").then( (data)=>{
                console.log('getting cart data');
                console.log(data);
                this.cartItems = data;
                console.log(this.cartItems);
                this.total = 0.0; 
                if(this.cartItems != null){
                    if(this.cartItems.length > 0){
                      this.cartItems.forEach( (item, index)=> {
                        this.total = this.total + item.amount
                        console.log("this is the total price");
                        console.log(this.total);
                        if (item.forcell_products){
                          if (item.forcell_products.product_data){
                            this.total = this.total + (item.forcell_products.line_total * item.quantity);
                          }else{
                            this.total = this.total + (item.forcell_products.product_price * item.quantity);
                          }
                        }
                      })
              
                    } else {
                      this.showEmptyCartMessage = true;
                    }
                }
                console.log("this is the total outside");
                console.log(this.total);
              })
          
            })
                
  
          })
            
      }

      })
    

  }

  removeFromCart(item, i){ 
    let price = item.price;
    let quantity = item.quantity;  
    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * quantity);
      if (item.forcell_products) {
        if (item.forcell_products.product_data) {
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
            console.log("in if");
            this.total = this.total - (item.forcell_products.product_price * data[i].quantity);
            console.log(item.forcell_products.product_price);
            console.log(qty);
            this.total = this.total + (item.forcell_products.product_price * data[i].quantity);
            console.log(this.total);
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
      // e.trigger('click');
      // alert(" this is the cart string" + this.cartString);
      // let modified = delete data.product;
      // console.log(modified);
      // this.cartString = JSON.stringify(data);
      // console.log(this.cartString);
    })
  }
}/* Class ends here */
