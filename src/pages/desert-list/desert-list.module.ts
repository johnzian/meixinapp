import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesertListPage } from './desert-list';

@NgModule({
  declarations: [
    DesertListPage,
  ],
  imports: [
    IonicPageModule.forChild(DesertListPage),
  ],
})
export class DesertListPageModule {}
