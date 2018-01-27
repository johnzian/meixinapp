import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response} from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  uphone="";
  upwd="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login():void{
    let uphone=this.uphone;
    let upwd=this.upwd;
    let url=`http://127.0.0.1:3000/login?uphone=${uphone}&upwd=${upwd}`;
    this.http.request(url).subscribe((res:Response)=>{
      if(res.json().code==1){
        this.navCtrl.push('HomePage');
      }else{
        alert("登录失败")
      }
    });
  }
}
