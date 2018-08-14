import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { FeedsProvider } from '../../providers/feeds/feeds';


interface IFeed{
  titulo:any;
}

@Component({
  selector: 'page-criar-feed',
  templateUrl: 'criar-feed.html',
})
export class CriarFeedPage {

  feed:IFeed = {titulo:''}
  lista:IFeed[];
  editandoFeed: boolean = false;
 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public feedsProvider: FeedsProvider,) {
  }

  ionViewDidLoad() {
    this.lista = this.feedsProvider.listar();
  }

  exibirEditando(feed:IFeed){
    this.feed = {titulo:this.feed};
    this.editandoFeed = true;

  }
  
  cadastrardados(){
    if(this.feed.titulo != ""){
      this.feedsProvider.addfeeds(this.feed);
      this.feed = {titulo:""};
      this.navCtrl.setRoot(HomePage,{
        feed: this.feed
      });
    }else{
      alert("Preencher o campo obrigatório: Título");
    }
  }

  atualizardados(){
  
         
  }

  cancelardados(){
    this.feed = {titulo:''};
    this.editandoFeed = false;
    
        
  }

}


