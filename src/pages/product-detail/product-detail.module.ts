import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
// import { RevmaxProvider } from '../../providers/revmax';
// import { WooApiModule } from 'ng2woo';
// import { IonicStorageModule } from '@ionic/storage';
// import { AppConfigurationProvider } from '../../providers/configuration/app-configuration';
import { Ionic2RatingModule } from 'ionic2-rating';
import { FormsModule } from '@angular/forms';


// const WooCommerceConfig = {
//   url:   'https://revmax.twinspark.co', 
//   consumerKey:    'ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19',
//   consumerSecret:  'cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013',
//   wpAPI: true,
//   version: 'wc/v1',
//   queryStringAuth : true
// };
@NgModule({
  declarations: [ProductDetailPage],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    Ionic2RatingModule,
    FormsModule,
    // WooApiModule.forRoot(WooCommerceConfig),
    // IonicStorageModule.forRoot()
  ],
  // providers: [
  //   RevmaxProvider,
  //   WooApiModule,
  //   AppConfigurationProvider
  // ]
})
export class ProductDetailPageModule {}
