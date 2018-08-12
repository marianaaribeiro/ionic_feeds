import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CriarFeedPage } from '../criar-feed/criar-feed';
import { Storage } from '@ionic/storage';
import { FeedsProvider } from '../../providers/feeds/feeds';


interface IFeed{
  titulo:any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  feed:IFeed = {titulo:''}
  lista:IFeed[];
  editandoFeed: boolean = false;
 
  //cadastroTituloFeed:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public feedsProvider: FeedsProvider,
              ) {
     

  }
  ionViewDidLoad() {
    this.lista = this.feedsProvider.listar();
  }

  goEdite(feed:IFeed){
    if(this.feed.titulo != ""){
      this.feed = feed.titulo;
      this.editandoFeed = true;
      this.navCtrl.setRoot(CriarFeedPage);
    }else{
      alert("Não foi possível editar no momento. Tente mais tarde");
    }
    
    
  }
  gocriarfeed(){
    this.navCtrl.setRoot(CriarFeedPage)
  }
  


}
