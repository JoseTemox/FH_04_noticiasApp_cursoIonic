import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../explore-container/interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  //tomar un elemento del template ya sea por id o por nombre
  @ViewChild(IonInfiniteScroll, {static: true}) infinitescroll: IonInfiniteScroll;

  public categories: string [] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor( private newsService: NewsService) {}

  ngOnInit() {
      // this.cargarNoticias();
      this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe( articles => {
            // console.log(articles);
            // this.articles.push(... articles);
            this.articles = [...articles];
          });
  }

  segmentChanged(category: Event){

    this.selectedCategory = (category as CustomEvent).detail.value;
    // this.cargarNoticias();
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe( articles => {
      // console.log(articles);
      // this.articles.push(... articles);
      this.articles = [...articles];
    });


  }
  // cargarNoticias(){
  //   this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe( articles => {
  //     // console.log(articles);
  //     // this.articles.push(... articles);
  //     this.articles = articles;
  //   });
  // }

  loadData(){
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true)
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
