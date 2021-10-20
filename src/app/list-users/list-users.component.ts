import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { each } from 'lodash';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  private subc = {} as {[key: string]: Subscription};

  users: IUser[] = [];

  constructor(
    private dataServ: DataService,
    private router: Router, 
    private titleService: Title,
    private translate: TranslateService
  ) { 
   
  }

  onSetTitle(): void {
    this.titleService.setTitle(this.translate.instant('Users'))
  }

  ngOnInit() {
    this.onSetTitle();
    this.subc.langChange = this.translate.onLangChange.subscribe(
      val => this.onSetTitle()
    );

    this.dataServ.getUsers();
    this.dataServ.users$.subscribe(data=> this.users = data);
  }

  ngOnDestroy(): void {
    each(this.subc, (el: Subscription) => el?.unsubscribe())
  }

  openUserDetails(userID: any) {
    this.router.navigate(["/users", userID]);
  }

}
