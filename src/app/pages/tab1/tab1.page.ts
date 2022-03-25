import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/explore-container/interfaces';
import { NewsService } from '../../services/news.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonInfiniteScroll, {static: true}) infinitescroll: IonInfiniteScroll;
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}
  ngOnInit() {
    this.newsService.getTopHeadLines().subscribe( articles=>

      this.articles.push(... articles)
    );
  }

  loadData(){
    this.newsService.getTopHeadlinesByCategory('business', true)
      .subscribe(articles => {



        //para cancelar el infinite scroll
        if(articles.length === this.articles.length){
          this.infinitescroll.disabled = true;
          // event.targetdisabled = true;
          return;
          //cabe destacar que este tipo de condicional
          //puede traer pproblema por las cantidades de los articulos en cada categoria, lo que
          //se puede hcer es comparar el nombre de las dos ultima noticias en articles y
          //en this.carticles en vez de comparar la longitud de las respuestas de ambas

        }
        this.articles = articles;

        //finaliza el infinite scroll

        //a veces se usa un setTimeUp de esta manera porque retrasa ka carga de la consulta
        // setTimeout(() => {

        //   event.target.complete();
        // }, 1000);
          // event.target.complete();
          this.infinitescroll.complete();

      });
    }



}
