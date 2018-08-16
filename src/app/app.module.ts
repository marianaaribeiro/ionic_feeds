import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FeedsProvider } from '../providers/feeds/feeds';
import { PostpvProvider } from '../providers/postpv/postpv';
import { PostPage } from '../pages/post/post';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PostPage,
    
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    IonicStorageModule.forRoot({
      name: '__MyFeed',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PostPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FeedsProvider,
    PostpvProvider,   
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    
  ]
})
export class AppModule {}
