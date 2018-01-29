import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Http,Response} from '@angular/http';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  uid=0;
  cartproduct=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    if(window.localStorage.getItem('uid')){//检测是否登录
      this.uid=parseInt(window.localStorage.getItem('uid'));
      this.http.request('http://127.0.0.1:3000/showcart?uid='+this.uid).subscribe((res:Response)=>{
      this.cartproduct=res.json();
    });
    }else{
      let alert = this.alertCtrl.create({
        title: '请先登录',
        buttons: [
          {
            text: '现去登录',
            handler: () => {
              this.navCtrl.push("LoginPage")
            }
          }
        ]
      });
      alert.present();
    }
  }

}
