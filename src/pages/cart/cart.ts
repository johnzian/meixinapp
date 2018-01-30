import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http:Http,
     private alertCtrl: AlertController,
     public toastCtrl:ToastController
    ) {
  }

  ionViewWillEnter(){
    this.loaddata();
  }
  //删除购物车商品
  deletecart(cid){
    this.http.request('http://127.0.0.1:3000/deletecart?cid='+cid+'&uid='+this.uid).subscribe((res:Response)=>{
      if(res.json().status=="ok"){
        this.loaddata();
      }else{
        alert("失败");
      }
    });
  }
  //获取用户的购物车信息
  loaddata(){
    this.cartproduct=[];
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
  //增加数量
  addproduct(cid,count){
    count++;
    this.http.request('http://127.0.0.1:3000/updatecart?cid='+cid+'&count='+count+'&uid='+this.uid).subscribe((res:Response)=>{
      if(res.json().status=="ok"){
        this.loaddata();
      }else{
        alert("失败");
      }
    });
  }
  //减少数量
  reduceproduct(cid,count){
    if(count>1){
      count--;
      this.http.request('http://127.0.0.1:3000/updatecart?cid='+cid+'&count='+count+'&uid='+this.uid).subscribe((res:Response)=>{
        if(res.json().status=="ok"){
          this.loaddata();
        }else{
          alert("失败");
        }
      });
    }
  }
  addorder(pid,count,cid){    
    this.http.request('http://127.0.0.1:3000/showaddress?uid='+this.uid).subscribe((res:Response)=>{
      let alert = this.alertCtrl.create({
        title: '选择送货地址',
        buttons: [
          {
            text: '取消',
            role: 'cancel'
          },
          {
            text: '购买',
            handler: data => {
              //获取的data就是用户所选的地址的aid
              var aid=data;
              //加入订单表并且会删除原定的购物车产品
              this.http.request('http://127.0.0.1:3000/addorder?uid='+this.uid+'&aid='+aid+'&pid='+pid+'&count='+count).subscribe((res:Response)=>{
                if(res.json().status=="ok"){
                  this.deletecart(cid);//删除原来的购物车产品
                  let toast=this.toastCtrl.create({//弹出吐司购买成功
                    message:'购买成功',
                    position:'middle',
                    showCloseButton:true
                  });
                  toast.present();
                }
              });
            }
          }
        ]
      });
      //把用户的地址栏打印出来
      for(let i=0;i<res.json().length;i++){
        alert.addInput({
          type: 'radio',
          label: res.json()[i].details,
          value: res.json()[i].aid
        });
      }
      alert.present();
    });
  }
}
