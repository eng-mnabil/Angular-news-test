import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NewsService } from '../../_services';

import { NewPost } from '../../_models';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
    newsPosts: NewPost[];
    postID;
    post;
    newForm: FormGroup;
    submitted = false;
    loading = false;
    
  constructor(
      private newsService: NewsService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
          console.log(params.get('id'));
          this.postID = params.get('id');
          this.newsService.getAll().subscribe((result:NewPost[])=>{
              console.log(result);
              console.log(typeof result);
              this.newsPosts = result;
              this.newsPosts.forEach((p: NewPost) => {
                  if (p.id == this.postID) {
                      this.post = p;
                      console.log(this.post);
                      this.updateForm();
                  }
              });
          },err=>{
              console.log(err);
          })
    });
    let randNumber = Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
    this.newForm = this.formBuilder.group({
        id: [randNumber, [Validators.required]],
        title: ['', [Validators.required]],
        details: ['', Validators.required],
        category: ['', Validators.required],
        date: ['', Validators.required],
        author: ['', Validators.required],
        image: ['', Validators.required],
        views: [0, Validators.required]
    });
  }
  
  onSubmit() {
      this.submitted = true;
      if(this.newForm.invalid) {
          return;
      }
      this.loading = true;
      //If has post this mean we are editing an existing post
      if(this.post) {
          this.newsService.update(this.newForm.value).subscribe(result=>{
              console.log(result);
          }, err=>{
              console.log(err);
          })
      }
      else {
          this.newsService.create(this.newForm.value).subscribe(result=>{
              console.log(result);
          }, err=>{
              console.log(err);
          })
      }
  }
  
  updateForm() {
      this.newForm.patchValue(this.post);
  }
}
