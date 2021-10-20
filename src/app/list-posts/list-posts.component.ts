import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPost, IUser, IPhoto, IPostPaginated } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../services/local-storage.service';
import { Subscription } from 'rxjs';
import { each, includes, isNil } from 'lodash';
import { skipWhile } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  private subc = {} as { [key: string]: Subscription };

  postId!: number | null;
  postPage = 1;

  onInitializePosts = false;
  postTotal!: number;
  totalPost = 12;
  posts: IPost[] = [];
  users: IUser[] = [];
  photos: IPhoto[] = [];
  isFavoriteUrl = includes(this.router.url, 'favorites');
  userSelected!: boolean;

  constructor(
    private dataService: DataService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private titleService: Title,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    
  ) {

    this.queryParams();
  }

  queryParams() {
    const id: number = +this.acRoute?.snapshot?.params?.userID;
    this.postId = isNaN(id) ? null : id;

    const page = +this.acRoute.snapshot.queryParams?.page;
    this.postPage = isNaN(page) ? 1 : page;
  }

  onSetTitle(): void {
    let title = this.isFavoriteUrl ? 'Favorites'
      : 'Home';
    this.titleService.setTitle(this.translate.instant(title))
  }

  ngOnInit(): void {
    this.onSetTitle();
    this.subc.langChange = this.translate.onLangChange.subscribe(
      _ => this.onSetTitle()
    );

    this.getData();
  }

  getData(): void {
    this.dataService.getPosts();

    this.subc.ls = this.localStorageService.favorites$
      .subscribe((_: any) => this.subscribePosts())

    this.dataService.getUsers();
    this.subc.users = this.dataService.users$
      .subscribe(data => this.users = data);

    this.dataService.getPhotos();
    this.subc.photos = this.dataService.photos$
      .subscribe(data => this.photos = data);

  }

  ngOnDestroy(): void {
    each(this.subc, (el: Subscription) => el?.unsubscribe())
  }

  subscribePosts(): void {
    this.subc?.posts?.unsubscribe();
    this.subc.posts = this.dataService.posts$
      .pipe(skipWhile(data => data?.length === 0))
      .subscribe(data => this.onSetPosts(data))
  }

  onSetPosts(data: IPost[]): void {
    // this.isFavoriteUrl = includes(this.router.url, 'favorites');

    if (isNil(this.postId) && !this.isFavoriteUrl) {
      const postObj = this.dataService.getPaginatedPosts(this.postPage, this.totalPost);
      this.posts = postObj?.data;
      this.postPage = postObj?.page;
      this.postTotal = postObj?.total;
      this.onInitializePosts = true;
      return;
    }

    this.posts = this.isFavoriteUrl
      ? data.filter((el: IPost) => this.localStorageService.getFavoriteValue().includes(el.id))
      : data.filter((el: IPost) => el.userId === this.postId);

    this.userSelected = !this.isFavoriteUrl;
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
