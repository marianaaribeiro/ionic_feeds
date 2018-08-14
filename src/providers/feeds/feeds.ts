import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class FeedsProvider {

  lista:any[];
  key:any = "lista"

  constructor(public storage: Storage,) {
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

  listar(){
   return this.lista;
  }
  addfeeds(dadosFeeds:any){
    this.storage.ready().then(() =>{
      this.lista.push(dadosFeeds);
      this.storage.set(this.key, this.lista);      
    })
  }

  deletarFeed(feed){
    for(let key in this.lista){
      if(this.lista[key] == feed){
        this.lista.splice(parseInt(key),1);
        this.storage.set(this.key, this.lista)
      }
    }
  }


}
