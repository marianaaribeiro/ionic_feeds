import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FeedsProvider } from '../../providers/feeds/feeds';
import { PostPage } from '../post/post';


interface IFeed{
  titulo:string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  feed:IFeed = {titulo:''};
  feeds:IFeed[];
  editandofeed:boolean = false;
  feedEditando:IFeed;
  lista:any[];
  key:string = "feeds";
  noFeed:string = "Não tem feed";

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public feedProvider:FeedsProvider,
              public storage: Storage) {
                this.storage.ready().then(()=>{
                  this.storage.get(this.key).then((dadosfeeds) => {
                    if(dadosfeeds){
                      this.lista = dadosfeeds;
                    }else{
                      this.lista = [];
                    }
                  });
            
                });
                   
  }

  doRefresh(lista) {
    console.log('Begin async operation', lista);

    setTimeout(() => {
      this.viewCtrl._didEnter();
      lista.complete();
    }, 2000);
  }
  ionViewDidLoad(){
   this.lista;
  }

  ionViewDidEnter() {
    this.feeds = this.feedProvider.listar();    
  }

  adicionarFeed(){
    if(this.feed.titulo != ""){
      this.feedProvider.adicionar(this.feed);
      this.viewCtrl._didEnter();
      this.feed = {titulo:''};
    }else{
      alert("Preencher campo obrigatório: Titulo da Feed")
    }

  }

  editarFeed(feed:IFeed){
    this.feed = {titulo:feed.titulo};
    this.editandofeed = true;
    this.feedEditando = feed;
  }
  cancelarEditacaoFeed(){
    this.feed = {titulo:''};
    this.editandofeed = false;
  }
  atualizarFeed(){
    if(this.feed.titulo != ""){
      this.feedProvider.atualizar(this.feedEditando,this.feed);
      this.cancelarEditacaoFeed();
    }
  }

  deletarFeed(feed:IFeed){
    if(this.feed.titulo != ""){
      this.feedProvider.deletar(feed);
      this.feed = {titulo:''};
      this.editandofeed = false;
    }else{
      alert("Não foi possível remover no momento. Tente mais tarde!")
    }
    
  }
  goPost(){
    this.navCtrl.push(PostPage);
  }
}
