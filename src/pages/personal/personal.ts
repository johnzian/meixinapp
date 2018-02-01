import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {Http,Response} from '@angular/http';
/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  uid=0;
  address=[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public http:Http,
     private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.loaddata();
  }
  //展示用户收货地址
  loaddata(){
    this.address=[];
    if(window.sessionStorage.getItem('uid')){//检测是否登录
      this.uid=parseInt(window.sessionStorage.getItem('uid'));
      this.http.request('http://www.johnzian.cn/MeiXinApp/php/route/user_address.php?uid='+this.uid).subscribe((res:Response)=>{
      this.address=res.json();
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
  //添加收货地址
  addAddress(){
    let prompt = this.alertCtrl.create({
      title: '添加收货地址',
      message: "输入你的收货地址",
      inputs: [
        {
          name: 'receiver',
          placeholder: '收货人名称'
        },
        {
          name: 'province',
          placeholder: '省'
        },
        {
          name: 'city',
          placeholder: '市'
        },
        {
          name: 'block',
          placeholder: '区'
        },
        {
          name: 'phone',
          placeholder: '电话'
        },
        {
          name: 'homenumber',
          placeholder: '固定电话'
        },
        {
          name: 'postcode',
          placeholder: '邮政编码'
        },
        {
          name: 'details',
          placeholder: '详细地址'
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            this.http.request('http://www.johnzian.cn/MeiXinApp/php/route/add_address.php?uid='+this.uid+'&receiver='+data.receiver+'&province='+data.province+'&city='+data.city+'&block='+data.block+'&phone='+data.phone+'&homenumber='+data.homenumber+'&postcode='+data.postcode+'&details='+data.details).subscribe((res:Response)=>{
              if(res.json()==0){
                alert("有问题");
              }else{
                alert("成功");
                this.loaddata();
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
