import { Component, OnInit, Input } from '@angular/core';
import { NewPost } from '../_models';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
    @Input() newPost;
  constructor() { }

  ngOnInit() {
  }

}
