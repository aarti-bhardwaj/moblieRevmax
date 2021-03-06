import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpgradeProductsPage } from './upgrade-products';
import { RevmaxProvider } from '../../providers/revmax';
import { WooApiModule } from 'ng2woo';
import { AppConfigurationProvider } from '../../providers/configuration/app-configuration';
import { IonicStorageModule } from '@ionic/storage';

const WooCommerceConfig = {
  url:   'https://revmax.twinspark.co', 
  consumerKey:    'ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19',
  consumerSecret:  'cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013',
  wpAPI: true,
  version: 'wc/v1',
  queryStringAuth : true
};
@NgModule({
  declarations: [
    UpgradeProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpgradeProductsPage),
    WooApiModule.forRoot(WooCommerceConfig),
    IonicStorageModule.forRoot()
  ],
  providers: [
    RevmaxProvider,
    WooApiModule,
    AppConfigurationProvider
  ]
})
export class UpgradeProductsPageModule {}
