import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import { NewsService } from '../_services';
import { NewPost } from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    newsPosts: NewPost[];
    authors=[];
    dates=[];
    categories=[];
    selectedDate="";
    selectedAuthor="";
    selectedCategory="";
    
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private newsService: NewsService
  ) { }

  ngOnInit() {
      this.getNews();
  }
  
  getNews() {
      this.newsService.getAll().subscribe((result:NewPost[])=>{
          console.log(result);
          console.log(typeof result);
          this.newsPosts = result;
          this.getFilterationValues();
      },err=>{
          console.log(err);
      })
  }
  
  getFilterationValues() {
      this.dates = [...new Set(this.newsPosts.map(item => item.date))];
      this.authors = [...new Set(this.newsPosts.map(item => item.author))];
      this.categories = [...new Set(this.newsPosts.map(item => item.category))];
  }

}
