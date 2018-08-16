import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PostpvProvider } from '../../providers/postpv/postpv';

interface IPost{
  titulo:string;
  descricao: string;
}

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post:IPost = {titulo:'', descricao:''};
  posts:IPost[];
  editandopost:boolean = false;
  postEditando:IPost;
  lista:any[];
  key:string = "posts";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public postpvProvider: PostpvProvider) {
                this.storage.ready().then(() =>{
                  this.storage.get(this.key).then((dadosposts) => {
                    if(dadosposts){
                      this.lista = dadosposts;
                    }else {
                      this.lista = [];
                    }
                  })      
                })   
  }
  
  ionViewDidEnter() {
    this.posts = this.postpvProvider.listar();
  }

  adicionarpost(){
    if(this.post.titulo != "" && this.post.descricao != ""){
      this.postpvProvider.adicionar(this.post);
      this.post = {titulo:'', descricao:''};
    }else{
      alert("Preencher campo obrigatório: Titulo do Post e Descrição")
    }

  }

  editarpost(post:IPost){
    this.post = {titulo:post.titulo, descricao: post.descricao};
    this.editandopost = true;
    this.postEditando = post;
  }
  cancelarEditacaopost(){
    this.post = {titulo:'', descricao:''};
    this.editandopost = false;
  }
  atualizarpost(){
    if(this.post.titulo != "" && this.post.descricao != ""){
      this.postpvProvider.atualizar(this.postEditando,this.post);
      this.cancelarEditacaopost();
    }
  }

  deletarpost(post:IPost){
    if(this.post.titulo != "" && this.post.descricao != ""){
      this.postpvProvider.deletar(post);
      this.post = {titulo:'', descricao:''};
      this.editandopost = false;
    }else{
      alert("Não foi possível remover no momento. Tente mais tarde!")
    }
    
  }


}
