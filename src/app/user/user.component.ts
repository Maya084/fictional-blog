import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { IUser } from '../models/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userID: any;
  user: IUser = {} as IUser;
  constructor(private activatedRoute: ActivatedRoute,
    private service:DataService
    ) { }

  ngOnInit(): void {
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));
    this.service.getUsers().subscribe(data=> {
      const res = data.find(el => el.id === this.userID);
      this.user = res as IUser;
    });
    
    // this.user = pom;
    
  }



}
