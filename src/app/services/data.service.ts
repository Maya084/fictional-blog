import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IComment, IPost, IUser } from 'src/app/models/interfaces';
import { URLS } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private hasRequestedPosts = false;
  private hasRequestedUsers = false;
  private postsSubs = new BehaviorSubject<IPost[]>([]);
  posts$ = this.postsSubs.asObservable();

  private usersSubs = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubs.asObservable();

  constructor(private http: HttpClient) { }

  // checkPostsForUpdates() {
  //   this.hasRequested = false;
  //   this.getPosts();
  // }

  getPosts(): void {
    if (
      this.hasRequestedPosts &&
      this.postsSubs.value.length !== 0
    ) { return; }
    this.hasRequestedPosts = true;

    this.http.get<IPost[]>(URLS.POSTS)
      .pipe(
        tap(data => this.postsSubs.next(data)),
        catchError(err => {
          return throwError(err)
        })
      ).subscribe();
    // setTimeout(() => {
    //   this.checkPostsForUpdates();
    // }, 5000);
  }

  getUsers(): void {
    if (this.hasRequestedUsers && this.postsSubs.value.length != 0) { return; }
    this.hasRequestedUsers = true;

    this.http.get<IUser[]>(URLS.USERS)
      .pipe(
        tap(data => this.usersSubs.next(data)),
        catchError(err => { return throwError(err) })).subscribe();
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`${URLS.POSTS}/${postId}`);
  }

  getCommentsById(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${URLS.POSTS}/${postId}/comments`);
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${URLS.USERS}/${userId}`);
  }


}
