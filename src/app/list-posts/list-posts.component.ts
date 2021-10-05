import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IUser, IPhoto } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { each } from 'lodash';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  private subs = {} as { [key: string]: Subscription };

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
    this.subs.posts = this.dataService.posts$.subscribe(
      data => this.renderView(data)
    )
  }

  renderView(data: IPost[]): void {
    if (data.length === 0) { return; }
    let id = this.listPostsActivatedRoute?.snapshot?.params?.userID;

    if (this.listPostsActivatedRoute.snapshot.routeConfig?.path === 'favorites') {
      this.posts = data.filter((el: IPost) => this.localStorageService.getFavoriteValue().includes(el.id));
    }
    else if (typeof id === 'undefined') {
      this.posts = data;
    }
    else {
      this.posts = data.filter((el: IPost) => el.userId === Number(id));
    }
  }

  openPost(post: IPost) {
    this.router.navigate(['/posts', post.id]);
  }

}
