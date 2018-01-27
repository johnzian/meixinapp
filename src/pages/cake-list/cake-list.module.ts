import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CakeListPage } from './cake-list';

@NgModule({
  declarations: [
    CakeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CakeListPage),
  ],
})
export class CakeListPageModule {}
