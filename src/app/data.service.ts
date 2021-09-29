import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment, IPost, IUser } from 'src/app/models/interfaces';
import { URLS } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(URLS.POSTS);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(URLS.USERS);
  }

  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(URLS.COMMENTS);
  }

}
