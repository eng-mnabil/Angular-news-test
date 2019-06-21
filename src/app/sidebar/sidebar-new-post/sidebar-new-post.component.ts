import { Component, OnInit, Input } from '@angular/core';
import { NewPost } from '../../_models';

@Component({
    selector: 'app-sidebar-new-post',
    templateUrl: './sidebar-new-post.component.html',
    styleUrls: ['./sidebar-new-post.component.scss']
})
export class SidebarNewPostComponent implements OnInit {
    @Input() newPost;
  constructor() { }

  ngOnInit() {
      // console.log(this.newPost);
  }

}
