import { Component, OnDestroy, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { IPost } from '../models/interfaces';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  post: IPost = {} as IPost;
  postNotFound = false;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    let id: number = Number(this.activatedRoute.snapshot.params?.postID);
    if (Number.isNaN(id)) { id = -1; }
    
    this.dataService.getPosts().subscribe(data => {
        if (data && !Array.isArray(data)) {
          this.postNotFound = true;
          return;
        }
        const res = data.find(el => el.id === id);
        if (!res) {
          this.postNotFound = true;
          return;
        }
        this.post = res;
      });
  }

  ngOnDestroy(): void {
  }

}
