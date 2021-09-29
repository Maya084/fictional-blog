import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/assets/interfaces';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  posts: IPost[] = [];
  private getPostsURL = "https://jsonplaceholder.typicode.com/posts";

  constructor(private data_servis: DataService, private router: Router) {

  }

  ngOnInit(): void {

    this.data_servis.getPosts(this.getPostsURL).subscribe(data => this.posts = data);
  }

  openPost(post: IPost) {
    this.router.navigate(['/posts', post.id]);

  }

}
