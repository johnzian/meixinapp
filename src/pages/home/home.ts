import { Component,ViewChild } from '@angular/core';
import { NavController  } from 'ionic-angular';
import {Http,Response} from '@angular/http';
import { IonicPage,Content } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  indexproduct=[];
  indexlunbo=[];
  len:Number;//控制轮播
  mylogin=false;
  uphone="";
  uid=0;
  ionViewWillEnter(){
    this.http.request('http://127.0.0.1:3000/indexproduct').subscribe((res:Response)=>{//首页产品载入
      this.indexproduct=res.json();
    });
    this.http.request('http://127.0.0.1:3000/lunbo').subscribe((res:Response)=>{//轮播载入
      this.indexlunbo=res.json();
      this.len=this.indexlunbo.length;
    });
    if(window.localStorage.getItem('uid')){//检测是否有登录
      this.uid=parseInt(window.localStorage.getItem('uid'));
      this.uphone=window.localStorage.getItem('uphone');
      this.mylogin=true;
    }
    // this.http.request('http://127.0.0.1:3000/islogin').subscribe((res:Response)=>{
    //   if(res.json().code=1){
    //     this.islogin=true;
    //     this.uphone=res.json().uphone;
    //     console.log(res.json());
    //   }
    // });
    //不知为什么使用ionic能正确登录，但不能记录session
  }
  constructor(public navCtrl: NavController,public http:Http) {

  }
  pushPage(goto){
    this.navCtrl.push(goto)
  }
  gotodetails(pid){
    this.navCtrl.push("ProductdetailsPage",{pid:pid})
  }
  gotop(){
    this.content.scrollToTop();
  }
}
