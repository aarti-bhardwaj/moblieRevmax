import { Injectable } from '@angular/core';
import {CustomHttpProvider  } from './custom-http';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { RevmaxProvider as Revmax } from '../../providers/revmax';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppConfigurationProvider {
  productsToCart: any = [];
  allProducts: any;
  getCartItems: any;
  price:any;
  //Enviornment variables
  wordpressStagingUrl:string="https://revmax.twinspark.co";
  // wordpressLiveUrl:string="http://revmax.twinspark.co";
  
  constructor(public http: CustomHttpProvider, private customhttp: Http, public storage: Storage, public Revmax: Revmax,) {
    this.storage.get("cart").then((data) => {
      if (data == null || data.length == 0){
        this.storage.set('fetchCart', true);
        console.log("call only when data is null");
        this.setCartItemsToStorage();
      }
    })
  }
  
  /* Fetch items from cart and set to storage */
  setCartItemsToStorage(){
    this.fetchCartItems()
      .subscribe((response) => {
        this.getCartItems = response;
        console.log("when data is null");
        console.log(this.getCartItems);

        var item;
        var productId = [];
        var productData = [];
        for (item in this.getCartItems) {
          console.log("pront id");
          console.log("this is the cart item");
          console.log(item);
          console.log(this.getCartItems[item].product_id);
          if (!this.getCartItems[item].forced_by) {
            productId.push(this.getCartItems[item].product_id);
            productData[this.getCartItems[item].product_id] = this.getCartItems[item].quantity;
          }
        }

        if (this.getCartItems) {
          this.Revmax.fetchProducts(productId);
            this.Revmax.getDataSubject.subscribe((val) => {
              console.log('get all products after getting cart.(from subject)');
              this.allProducts = val.allProducts;
              console.log(this.allProducts);
              if (this.allProducts != null && this.storage.get('fetchCart')) {
                console.log("getting data from cart");
                var data = [];
                for (let i = 0; i < this.allProducts.length; i++) {
                  data.push({
                    // "product": product,
                    "name": this.allProducts[i].name,
                    "quantity": productData[this.allProducts[i].id],
                    "image": this.allProducts[i].images[0].src,
                    "price": parseFloat(this.allProducts[i].price),
                    "amount": parseFloat(this.allProducts[i].price) * productData[this.allProducts[i].id],
                    "product_id": this.allProducts[i].id,
                    "variation_id":"",
                    "variation": "",
                    "forcell_products": this.allProducts[i].force_sell_product_info
                  })
                }
                 
                console.log(data);
                this.storage.set("cart",data).then(() => {
                  console.log("Cart Updated");
                  this.storage.set('fetchCart', false);
                  this.storage.get("cart").then((data) => {
                    console.log("getting storage data");
                    console.log(data);
                  })
                })
              }
            });
          
        }

      },
      (error) => {
        console.log('in error');
        console.log('error in getting cart items');
        console.log(error);

      });
  }



  fetchMenuItems(){
    return this.http.get(this.wordpressStagingUrl+'/wp-json/wp-api-menus/v2/menus/2184')
                      .map((response) => response.json());
  }  
  
  /* Fetch the product variation */
  getProductVariation(requestData, product, productId){
    let body = new URLSearchParams();
    body.set('product_id',productId);
    for(let key in requestData){
      let key1 = key.toLowerCase( );
      key1 = key1.replace(/\s/g, "-");
      key1 = "attribute_"+key1;
      body.set(key1, requestData[key]);
      console.log('In App configuration');
      console.log(body);
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = this.wordpressStagingUrl +"/product/"+product+"/?wc-ajax=get_variation";
    return this.customhttp.post(url, body.toString().replace(/ /g,''),options)
    .map((response) => response.json());
  }

  /* Use to filter products */    
  filterProducts(productCat, attResponse) {
    // http://revmax.twinspark.co/wp-json/instant/v1/search?product_cat=combo-kit&pa_make=ford
    if(attResponse == null){
      return this.http.get(this.wordpressStagingUrl + '/wp-json/instant/v1/search?product_cat=' + productCat+ '&')
        .map((response) => response.json());
    }else{
      console.log('I am getting this attribute response');
      console.log(attResponse);
      console.log(typeof attResponse)
    
      var search = ""
      Object.keys(attResponse).forEach(function (key) {
        console.log('In for each');
        search = search+'&' + key + '=' + attResponse[key];
        console.log(key, attResponse[key]);

      });

      console.log('Final search');
      console.log(search);
      return this.http.get(this.wordpressStagingUrl + '/wp-json/instant/v1/search?product_cat=' + productCat +search)
        .map((response) => response.json());
    
    }

  }

  /* Get cart items from revmax site. */
  fetchCartItems() {
    console.log("in cart data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let timeStamp = +new Date();
    
    let url = this.wordpressStagingUrl + '/wp-json/cart/v1/cart-items?tsp=' + timeStamp;

    
    return this.customhttp.get(url, options)
      .map((response) => response.json());
    // http://revmax.twinspark.co/wp-json/cart/v1/cart-items
  }

  /* Post Reviews of products */
  postReviews(requestData, productId) {
    let body = new URLSearchParams();
    body.set('comment_post_ID', productId);
    body.set('comment_author', requestData.userName);
    body.set('comment_author_email', requestData.userEmail);
    body.set('comment_content', requestData.userContent);
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = this.wordpressStagingUrl + "/wp-json/review/v1/product-review";
    return this.customhttp.post(url, body.toString().replace(/ /g, ''), options)
      .map((response) => response.json());
  }


  }
 