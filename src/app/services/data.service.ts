import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IComment, IPhoto, IPost, IPostPaginated, IUser } from 'src/app/models/interfaces';
import { URLS } from 'src/assets/constants';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private hasRequestedPosts = false;
  private hasRequestedUsers = false;
  private hasRequestedPhotos = false;
  
  private postsSubs = new BehaviorSubject<IPost[]>([]);
  posts$ = this.postsSubs.asObservable();

  private usersSubs = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubs.asObservable();

  private photosSubs = new BehaviorSubject<IPhoto[]>([]);
  photos$ = this.photosSubs.asObservable();

  constructor(private http: HttpClient) {}

  // checkPostsForUpdates() {
  //   this.hasRequested = false;
  //   this.getPosts();
  // }

  getPaginatedPosts(page: number, limit = 12): IPostPaginated {
    const postLists = [...this.postsSubs.value];
    const result = postLists.slice((page - 1) * limit, page * limit);
    return {
      data: result,
      page: page,
      total: Math.ceil(postLists.length / limit)
    } as IPostPaginated;
  }

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
      ).subscribe({ error: () => {} });
  }

  getUsers(): void {
    if (this.hasRequestedUsers && this.postsSubs.value.length != 0) { return; }
    this.hasRequestedUsers = true;

    this.http.get<IUser[]>(URLS.USERS)
      .pipe(
        tap(data => this.usersSubs.next(data)),
        catchError(err => { return throwError(err) }))
      .subscribe({ error: () => {} });
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`${URLS.POSTS}/${postId}`).pipe(
      catchError(err => throwError("Error the post ID doesn't exist")));
  }

  getCommentsById(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${URLS.POSTS}/${postId}/comments`).pipe(
      catchError(err => throwError("Error the comment ID doesn't exist")));
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${URLS.USERS}/${userId}`).pipe(
      catchError(err => throwError("Error the user ID doesn't exist"))
    );
  }

  getPhotos(): void {
    if (this.hasRequestedPhotos && this.photosSubs.value.length != 0) { return; }
    this.hasRequestedPhotos = true;

    this.http.get<IPhoto[]>(URLS.PHOTOS)
      .pipe(
        tap(data => this.photosSubs.next(data)),
        catchError(err => throwError(err))
      ).subscribe({ error: () => {} });

  }
}
