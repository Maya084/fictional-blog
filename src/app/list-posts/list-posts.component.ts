import { Component, Input, OnInit } from '@angular/core';
import { IPost, IUser, IPhoto } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  posts: IPost[] = [];
  users: IUser[] = [];
  photos: IPhoto[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private listPostsActivatedRoute: ActivatedRoute,
    private titleService: Title,
    private localStorageService: LocalStorageService
  ) {
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
    this.dataService.getPosts();
    let id = this.listPostsActivatedRoute.snapshot.params.userID;
    this.dataService.posts$.subscribe(
      data => {
        if (data.length === 0) { return; }

        if (typeof id === 'undefined') {
          this.posts = data;
        }
        else {
          this.posts = data.filter((el: IPost) => el.userId === Number(id));
        }
      }
    )
    this.dataService.getUsers();
    this.dataService.users$.subscribe(data =>
      this.users = data);

    this.dataService.getPhotos();
    this.dataService.photos$.subscribe(data =>
      this.photos = data);
  }

  openPost(post: IPost) {
    this.router.navigate(['/posts', post.id]);
  }

  likePost(postid: number) {
    if (this.isLiked(postid)) {
      this.localStorageService.unfavoritePost(postid);
    }
    else {
      this.localStorageService.favoritePost(postid);
    }
  }

  isLiked(postid: number) {
    return this.localStorageService.isFavorite(postid);
  }
}
