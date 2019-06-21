import { Component, OnInit } from '@angular/core';

import { NewsService } from '../_services';
import { NewPost } from '../_models';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    latestNewsPosts: NewPost[];
    popularNewsPosts: NewPost[];

    constructor(
      private newsService: NewsService
    ) { }

    ngOnInit() {
      this.getLatestNews();
      this.getPopularNews();
    }

    getLatestNews() {
      this.newsService.getLatestNews().subscribe((result:NewPost[])=>{
          this.latestNewsPosts = result;
      },err=>{
          console.log(err);
      })
    }
    
    getPopularNews() {
      this.newsService.getPopularNews().subscribe((result:NewPost[])=>{
          this.popularNewsPosts = result;
      },err=>{
          console.log(err);
      })
    }
}
