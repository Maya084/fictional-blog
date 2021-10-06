import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IUser, IPhoto, IPostPaginated } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { each, includes, isNil } from 'lodash';

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
  totalPost = 6;
  posts: IPost[] = [];
  users: IUser[] = [];
  photos: IPhoto[] = [];
  isFavoriteUrl!:boolean;
  userSelected!: boolean;

  constructor(
    private dataService: DataService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private titleService: Title,
    private localStorageService: LocalStorageService
  ) {
    this.titleService.setTitle("Home");
    this.queryParams();
  }
  
  queryParams() {
    const id: number = +this.acRoute?.snapshot?.params?.userID;
    this.postId = isNaN(id) ? null : id;

    const page = +this.acRoute.snapshot.queryParams?.page;
    this.postPage = isNaN(page) ? 1 : page;
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

  subscribePosts(): void {
    this.subs?.posts?.unsubscribe();
    this.subs.posts = this.dataService.posts$
      .subscribe(data => {
        if (data.length === 0) { return; }

        this.isFavoriteUrl = includes(this.router.url, 'favorites');

        if (isNil(this.postId) && !this.isFavoriteUrl) {
          const postObj = this.dataService.getPaginatedPosts(this.postPage, this.totalPost);
          this.posts = postObj.data;
          this.postPage = postObj.page;
          this.postTotal = postObj.total;
          this.onInitializePosts = true;
          return;
        }

        this.posts = this.isFavoriteUrl
          ? data.filter((el: IPost) => this.localStorageService.getFavoriteValue().includes(el.id))
          : data.filter((el: IPost) => el.userId === this.postId);

        this.userSelected = !this.isFavoriteUrl;
        console.log(this.userSelected, this.isFavoriteUrl);
      })
  }

  openPost(post: IPost): void {
    this.router.navigate(['/posts', post.id]);
  }

  changePage(page: any): void {
    this.postPage = page;
    this.router.navigate(['/posts'], { queryParams: { page: this.postPage } });
    const postObj = this.dataService.getPaginatedPosts(this.postPage, this.totalPost);
    this.posts = postObj.data;
    this.postPage = postObj.page;
    this.postTotal = postObj.total;
  }

}
