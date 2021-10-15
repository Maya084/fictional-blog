import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IComment } from 'src/app/models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { isNaN } from 'lodash';

@Component({
  selector: 'app-comments-post',
  templateUrl: './comments-post.component.html',
  styleUrls: ['./comments-post.component.scss']
})
export class CommentsPostComponent implements OnInit {

  postID: any;
  comments: IComment[] = [];

  constructor(private dataServ: DataService,
    private commentsActivatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getComments();
  }

  getComments(): void {  
    this.postID = Number(this.commentsActivatedRoute.snapshot.params?.postID);
    if(isNaN(this.postID)){return;}
    this.dataServ.getCommentsById(this.postID)
      .subscribe(data => this.comments = data);
  }


}
