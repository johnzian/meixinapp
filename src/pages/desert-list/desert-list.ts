import { Component } from '@angular/core';
import {Http,Response} from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DesertListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-desert-list',
  templateUrl: 'desert-list.html'
})
export class DesertListPage {
  deserts=[];
  productcount=0;
  pnum:number=1;
  totalpage=0;
  canload=true;
  ionViewWillEnter(){
    //首次运行，必先运行一次函数，还有获得总页数,设定了每一页都为12个产品
    this.loaddata();
    this.http.request('http://127.0.0.1:3000/desertlist_count').subscribe((res:Response)=>{
      this.productcount=res.json()["COUNT(pid)"];
      this.totalpage=Math.ceil(this.productcount/12);
    });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  loaddata(){
    //获得分页产品的数据
    this.http.request('http://127.0.0.1:3000/desertlist?pnum='+this.pnum).subscribe((res:Response)=>{
      for(let i=0;i<res.json().data.length;i++){
      this.deserts.push(res.json().data[i]);
      }
    });
  }
  gotodetails(pid){
    this.navCtrl.push("ProductdetailsPage",{pid:pid})
  }
  doInfinite(infiniteScroll) {
//每拉动一次就运行一次函数
    setTimeout(() => {
      if(this.pnum<this.totalpage){
        this.pnum++;
        this.loaddata();
      }else{
        this.canload=false;
      }
      infiniteScroll.complete();
    }, 1000);
  }
}
