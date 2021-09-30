import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  posts: IPost[] = [];
  //@Input() userID: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private listPostsActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.dataService.getPosts();
    let id = this.listPostsActivatedRoute.snapshot.params.userID;
    this.dataService.posts$.subscribe(
      data => {        
        if (typeof id === 'undefined') { this.posts = data; }
        else { this.posts = data.filter((el: IPost) => el.userId === Number(id)); }
      }
    )

    // this.dataService.posts$.subscribe(
    //   data=> {
    //     if(this.userID === undefined) {this.posts = data;}
    //     else {this.posts = data.filter(i=> i.userId==this.userID)}
    //   }
    // )

  }

  openPost(post: IPost) {
    this.router.navigate(['/posts', post.id]);

  }

}
