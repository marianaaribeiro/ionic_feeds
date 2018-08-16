import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class PostpvProvider {

  lista:any[];
  key:string = "posts";

  constructor(public http: HttpClient,
              public storage: Storage) {
                this.storage.ready().then(()=>{
                  this.storage.get(this.key).then((dadosposts) => {
                    if(dadosposts){
                      this.lista = dadosposts;
                    }else{
                      this.lista = [];
                    }
                  });
            
                });
  }

  listar(){
    return this.lista;
  }
  adicionar(dadosposts:any){
    this.storage.ready().then(()=>{
        this.lista.push(dadosposts);
        this.storage.set(this.key, this.lista);
    });
  }
  atualizar(post,dados){
    for(let key in this.lista){
      if(this.lista[key] == post){
        this.lista[key]= dados;
        this.storage.set(this.key, this.lista);
      }
    }
  }

  deletar(post){
    for(let key in this.lista){
      if(this.lista[key] == post){
        this.lista.splice(parseInt(key),1);
        this.storage.set(this.key, this.lista);
      }
    }
  }


}
