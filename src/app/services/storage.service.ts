import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular'
import { Article } from '../explore-container/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _locarArticles: Article[] = []

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalArticles(){
    return [...this._locarArticles];
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  async saveRemoveArticle(article: Article){

    const exist = this._locarArticles.find( localArticle => localArticle.title === article.title);
    if(exist){
      this._locarArticles = this._locarArticles.filter(localArticle => localArticle.title!== article.title)


    }else{
      this._locarArticles = [article, ...this._locarArticles];
    }

    this._storage.set('articles', this._locarArticles);

  }

  async loadFavorites(){
    try {
      const articles = await this._storage.get('articles');
      this._locarArticles = articles || [];
    } catch (error) {

    }
  }

  articleInFavorite(article: Article){
    return !!this._locarArticles.find(localArticle => localArticle.title === article.title);

  }
}
