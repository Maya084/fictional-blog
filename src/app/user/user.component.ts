import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IPost, IUser } from '../models/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userID: any;
  hasPosts = true;
  user: IUser = {} as IUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: DataService,
    private titleService: Title
  ) { 
    
  }

  ngOnInit(): void {
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));
    this.service.getUserById(this.userID).subscribe(data => {
      this.user = data;
      this.titleService.setTitle(String(this.user.name));
    });

    this.service.getPosts();
    this.service.posts$.subscribe(
      data => {
        const res = data.find((a: IPost) => a.userId === this.userID)
        if (typeof res === undefined) {
          this.hasPosts = false;
        }
      }
    );
  }

}
