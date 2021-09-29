import { Component, Input, OnInit} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { IComment } from 'src/app/models/interfaces';

@Component({
  selector: 'app-comments-post',
  templateUrl: './comments-post.component.html',
  styleUrls: ['./comments-post.component.scss']
})
export class CommentsPostComponent implements OnInit {
  @Input() postID: any;
  comments: IComment[] = [];

  constructor(private dataServ: DataService) { }
  

  ngOnInit() {
    this.dataServ.getComments().subscribe(data => {
      let allComments: IComment[] = data;
      this.comments = allComments.filter(comm => comm.postId === this.postID);
      
    });


  }







}
