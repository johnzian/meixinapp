import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
import {Http,Response} from '@angular/http';
import { IonicPage } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  indexproduct=[];
  indexlunbo=[];
  len:Number;//控制轮播
  ionViewWillEnter(){
    this.http.request('http://127.0.0.1:3000/indexproduct').subscribe((res:Response)=>{
      this.indexproduct=res.json();
    });
    this.http.request('http://127.0.0.1:3000/lunbo').subscribe((res:Response)=>{
      this.indexlunbo=res.json();
      console.log(res.json());
      this.len=this.indexlunbo.length;
    });
  }
  constructor(public navCtrl: NavController,public http:Http) {

  }
  pushPage(goto){
    this.navCtrl.push(goto)
  }
  gotodetails(pid){
    this.navCtrl.push("ProductdetailsPage",{pid:pid})
  }
}
