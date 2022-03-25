import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { Article } from '../../explore-container/interfaces/index';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;

  constructor(private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtlr: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService) { }

  openArticle(){

    //para redirigir la plataforma con que se esta abriendo

    if(this.platform.is('ios') || this.platform.is('android')){
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;

    }

    window.open(this.article.url, '_blanck');

  }

  async onOpenMenu(){

    const articleInFavorite = this.storageService.articleInFavorite(this.article);


    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Remover Favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ];

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    if(this.platform.is('capacitor')){
      normalBtns.unshift(shareBtn);

    }

    const actionSheet = await this.actionSheetCtlr.create({
      header: 'Opciones',
      buttons: normalBtns
    });





    await actionSheet.present();
  }

  onShareArticle(){

    const { title, source, url } = this.article;

    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article);
  }

}
