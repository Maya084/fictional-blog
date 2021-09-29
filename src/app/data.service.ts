import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment, IPost, IUser } from 'src/assets/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPosts(url: string): Observable<IPost[]>
  {
    return this.http.get<IPost[]>(url);
  }

  getUsers(url: string): Observable<IUser[]>
  {
    return this.http.get<IUser[]>(url);
  }

  getComments(url: string): Observable<IComment[]>
  {
    return this.http.get<IComment[]>(url);
  }

}
