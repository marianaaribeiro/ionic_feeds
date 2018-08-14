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
  key:any = "lista";
 
  //cadastroTituloFeed:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public feedsProvider: FeedsProvider,
              ) {
                this.storage.ready().then(() =>{
                  storage.get(this.key).then((dadosFeeds) => {
                    if(dadosFeeds){
                      this.lista = dadosFeeds;
                    }else {
                      this.lista = [];
                    }
                  })      
                })   
     

  }
  ionViewDidLoad() {
    this.lista = this.feedsProvider.listar();
  }

  goEdite(feed:IFeed){
    
    this.feed = {titulo:this.feed};
    this.editandoFeed = false;
   
    if( this.feed != {titulo: feed.titulo} &&  this.editandoFeed == false){      
     
     this.navCtrl.setRoot(CriarFeedPage,{
      editandoFeed: true,
     }); 
     console.log(feed)     
    }else{
      alert("Não foi possível editar no momento. Tente mais tarde");
    }
    
    
  }
  deletar(feed:IFeed){
    this.feedsProvider.deletarFeed(feed);
    console.log(feed);
  }
  gocriarfeed(){
    this.navCtrl.setRoot(CriarFeedPage)
  }
  


}
