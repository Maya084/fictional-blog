import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/assets/interfaces';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users : IUser[] = [];
  getUsersURL = "https://jsonplaceholder.typicode.com/users";
  constructor(private data_servis:DataService) { }

  ngOnInit() {

    this.data_servis.getUsers(this.getUsersURL).subscribe(data=> this.users= data)

  }

}
