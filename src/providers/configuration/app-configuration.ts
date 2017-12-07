import { Injectable } from '@angular/core';
import {CustomHttpProvider  } from './custom-http';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppConfigurationProvider {
  getCartItems: any;
  total: any;
  //Enviornment variables
  wordpressStagingUrl:string="https://revmax.twinspark.co";
  // wordpressLiveUrl:string="http://revmax.twinspark.co";
  
  constructor(public http: CustomHttpProvider, private customhttp: Http, public storage: Storage) {
    this.fetchCartItems()
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
  
  fetchMenuItems(){
    // var menuOptions = [];
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

  /* Add product to cart with no variation.*/
    addToCart(productCategory, productId){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let url = this.wordpressStagingUrl+'/product-category/'+productCategory+'/?add-to-cart='+productId;
      
      return this.http.get(url,options)
      .map((response) => response);
      /* Example */
    // <a href="http://revmax.twinspark.co/product-category/performance-valve-bodies/performance-valve-bodies-ford-diesel/?add-to-cart=4849">Add to Cart</a>
  }

  /* Add to cart with variations. */
  addToCartVariation(productCategory, productId, variations, variationId){
    let body = new URLSearchParams();
    for(let key in variations){
      let key1 = key.toLowerCase( );
       key1 = key1.replace(/\s/g, "-");
       key1 = "attribute_"+key1;
       body.set(key1, variations[key]);
       console.log('In App configuration');
       console.log(body);
     }
    
    return this.http.get(this.wordpressStagingUrl+'/product-category/'+productCategory+'/?add-to-cart='+productId+'&variation_id='+variationId+'&'+body.toString().replace(/ /g,''))
    .map((response) => response.json());
    /* Example */
  // http://revmax.twinspark.co/product/dodge-rebuilt-48re-signature-series-transmission/?add-to-cart=8490&variation_id=8531&attribute_select-vehicle=2%20Wheel%20Drive&attribute_torque-converter-stall-speed=Stock%20Stall&attribute_valve-body-options=Standard%20High%20Performance%20/%20Towing
  }

  getFrontPage(){
    return this.http.get(this.wordpressStagingUrl+'/wp-json/wp/v2/frontpage')
    .map((response) => response.json());
  }

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

  /* Empty cart */

  emptyCart() {
    return this.http.get(this.wordpressStagingUrl + '/cart/?empty-cart=true')
      .map((response) => response.json());
  }

  // http://revmax.twinspark.co/cart/?empty-cart=true

  }
 