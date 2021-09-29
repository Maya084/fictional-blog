import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  ID: any;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.paramMap.get('postID');
    console.log(id);
    this.ID = id;
  }

  ngOnDestroy(): void {
  }

}
