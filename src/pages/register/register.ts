import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import {Http,Response} from '@angular/http'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  uphone="";
  upwd="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public toastCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  showtoast(){
    let toast=this.toastCtrl.create({
      message:'注册成功',
      position:'middle',
      showCloseButton:true
    });
    toast.present();
  }
  register():void{
    let uphone=this.uphone;
    let upwd=this.upwd;
    let url=`http://127.0.0.1:3000/register?uphone=${uphone}&upwd=${upwd}`;
    this.http.request(url).subscribe((res:Response)=>{
      if(res.json().status=="ok"){
        this.showtoast();
        this.navCtrl.push('LoginPage');
      }else{
        alert("手机号已被注册")
      }
    });
  }
}
