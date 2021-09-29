import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/interfaces';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  posts: IPost[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.getPosts()
      .subscribe(data => this.posts = data);
  }

  openPost(post: IPost) {
    this.router.navigate(['/posts', post.id]);

  }

}
