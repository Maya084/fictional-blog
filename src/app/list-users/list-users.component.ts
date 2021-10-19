import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: IUser[] = [];

  constructor(
    private dataServ: DataService,
    private router: Router, 
    private titleService: Title,
    private translate: TranslateService
  ) { 
    translate.get('Users').subscribe(data=>
      {
        this.titleService.setTitle(data);
      })
  }

  ngOnInit() {
    this.dataServ.getUsers();
    this.dataServ.users$.subscribe(data=> this.users = data);

  }

  openUserDetails(userID: any) {
    this.router.navigate(["/users", userID]);
  }

}
