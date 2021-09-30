import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.dataServ.getUsers()
      .subscribe(data => this.users = data)

  }

  openUserDetails(userID: any) {
    this.router.navigate(["/users", userID]);
  }

}
