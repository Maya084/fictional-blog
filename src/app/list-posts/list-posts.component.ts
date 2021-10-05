import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IUser, IPhoto, IPostPaginated } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { each, isNil } from 'lodash';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  private subs = {} as { [key: string]: Subscription };

  postId!: number | null;
  postPage = 1;

  onInitializePosts = false;
  postTotal!: number;
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
    const id: number = +this.listPostsActivatedRoute?.snapshot?.params?.userID;
    this.postId = isNaN(id) ? null : id;
  }

  ngOnInit(): void {
    this.dataService.getPosts();

    this.subs.ls = this.localStorageService.favorites$
      .subscribe(_ => this.subscribePosts())

    this.dataService.getUsers();
    this.subs.users = this.dataService.users$
      .subscribe(data => this.users = data);

    this.dataService.getPhotos();
    this.subs.photos = this.dataService.photos$
      .subscribe(data => this.photos = data);
  }

  ngOnDestroy(): void {
    each(this.subs, el => el?.unsubscribe())
  }

  subscribePosts() {
    this.subs?.posts?.unsubscribe();
    this.subs.posts = this.dataService.posts$
      .subscribe(data => {
        if (data.length === 0) { return; }

        if (isNil(this.postId)) {
          const postObj = this.dataService.getPaginatedPosts(this.postPage, 9);
          this.posts = postObj.data;
          this.postPage = postObj.page;
          this.postTotal = postObj.total;
          this.onInitializePosts = true;
          return;
        }

        this.renderView(data)
      })
  }

  renderView(data: IPost[]): void {
    if (this.listPostsActivatedRoute?.snapshot?.routeConfig?.path === 'favorites') {
      this.posts = data.filter((el: IPost) => this.localStorageService.getFavoriteValue().includes(el.id));
    }
    else {
      this.posts = data.filter((el: IPost) => el.userId === this.postId);
    }
  }

  openPost(post: IPost) {
    this.router.navigate(['/posts', post.id]);
  }

  changePage(page: any) {
    this.postPage = page;
    console.log('Change Page', page);
    
    // this.posts_paginated = [...this.posts.slice(3 * (page - 1), 3 * (page - 1) + 3)];
  }

}
