import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../_services';

import { NewPost } from '../_models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
    newsPosts: NewPost[];
    
  constructor(
      private newsService: NewsService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
      this.getNews();
  }
  
  getNews() {
      this.newsService.getAll().subscribe((result:NewPost[])=>{
          this.newsPosts = result;
      },err=>{
          console.log(err);
      })
  }
  
  create(){
    this.router.navigate(['/admin/create'])  ;
  }
  
  edit(id) {
      this.router.navigate(['/admin/edit',id])  ;
  }
  
  delete(id) {
      this.newsService.delete(id).subscribe((result:NewPost[])=>{
          this.newsPosts = result;
      },err=>{
          console.log(err);
      })
  }

}
