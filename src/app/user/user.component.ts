import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IPost, IUser } from '../models/interfaces';
import { Title } from '@angular/platform-browser';
import { find, isNaN, isNil } from 'lodash';

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
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));
    if (isNaN(this.userID)) {
      this.userID = -1;
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
  }

  getUser(): void {
    this.service.getUserById(this.userID).subscribe(data => {
      this.user = data;
      this.titleService.setTitle(String(this.user.name));
    });  
  }

  getPosts(): void {
    this.service.getPosts();
    this.service.posts$.subscribe(
      data => {
        const res = find(data, ['userId', this.userID])
        if (isNil(res)) {
          this.hasPosts = false;
        }
      }
    );
  }

}
