import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IPost, IUser } from '../models/interfaces';
import { Title } from '@angular/platform-browser';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  private postSubs!: Subscription;

  postId!: number;
  post: IPost = {} as IPost;
  postNotFound = false;
  user: IUser = {} as IUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: DataService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postId = Number(this.activatedRoute.snapshot.params?.postID);
    if (Number.isNaN(this.postId)) { this.postId = -1; }

    this.postSubs = this.postService.getPostById(this.postId)
      .pipe(
        switchMap(data => {
          this.post = data;
          this.titleService.setTitle(this.post.title);
          return this.postService.getUserById(data.userId)
        }),
      ).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.postSubs?.unsubscribe();
  }

}
