import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response} from '@angular/http';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html'
})
export class ProductdetailsPage {
  pid=0;
  productdetails={"title":"","mprice":0,"nprice":0,"subtitle":"","sbimg":"","taste":"","pound":0};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.pid = this.navParams.get('pid');
  }

  ionViewWillEnter(){
    this.http.request('http://127.0.0.1:3000/getproduct?pid='+this.pid).subscribe((res:Response)=>{
      this.productdetails=(res.json()[0]);
      console.log(this.productdetails);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }

}
