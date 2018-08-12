import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarFeedPage } from './criar-feed';


@NgModule({
  declarations: [
    CriarFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarFeedPage),
  ],

})
export class CriarFeedPageModule {}
