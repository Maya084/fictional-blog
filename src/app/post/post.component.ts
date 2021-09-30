import { Component, OnDestroy, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { IPost, IUser } from '../models/interfaces';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  post: IPost = {} as IPost;
  postNotFound = false;
  user: IUser = {} as IUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: DataService
  ) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.params?.postID);
    if (Number.isNaN(id)) { id = -1; }
    this.postService.getPostById(id).subscribe(data => {
      this.post = data;
      this.postService.getUserById(this.post.userId).subscribe(data2 =>
        this.user = data2)
    });

  }

  ngOnDestroy(): void {
  }

}
