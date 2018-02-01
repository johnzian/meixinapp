import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
  pid:number=0;
  uid:number=0;
  count:number=1;
  productdetails={"title":"","mprice":0,"nprice":0,"subtitle":"","sbimg":"","taste":"","pound":0};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private alertCtrl: AlertController) {
    this.pid = this.navParams.get('pid');
  }

  ionViewWillEnter(){
    //获得产品详情
    this.http.request('http://www.johnzian.cn/MeiXinApp/php/route/getproductbyid.php?pid='+this.pid).subscribe((res:Response)=>{
      this.productdetails=(res.json());
    });
    //检测是否登录
    if(window.sessionStorage.getItem('uid')){
      this.uid=parseInt(window.sessionStorage.getItem('uid'));
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }
  show(){//加入购物车按钮
    let count=Math.ceil(this.count);
    if(this.uid!=0){//如果登录了
      if(!isNaN(count)){//检测是否为数字类型
        let uid=this.uid;
        let pid=this.pid;
        let url=`http://www.johnzian.cn/MeiXinApp/php/route/add_cart.php?uid=${uid}&pid=${pid}&count=${count}`;
        this.http.request(url).subscribe((res:Response)=>{
          if(res.json()==1){
            let alert = this.alertCtrl.create({
              title: '加入购物车成功',
              buttons: [
                {
                  text: '继续购买',
                  role: 'cancel'
                },
                {
                  text: '现在结算',
                  handler: () => {
                    this.navCtrl.push("CartPage")
                  }
                }
              ]
            });
            alert.present();
          }
        });
      }
    }else{
      let alert = this.alertCtrl.create({
        title: '请先登录',
        buttons: [
          {
            text: '暂不登录',
            role: 'cancel'
          },
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
