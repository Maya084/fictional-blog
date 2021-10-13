import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { URLS } from 'src/assets/constants';
import { IComment, IPhoto, IPost, IUser } from '../models/interfaces';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
    service = TestBed.inject(DataService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service['hasRequestedPhotos']).toEqual(false);
    expect(service['hasRequestedUsers']).toEqual(false);
    expect(service['hasRequestedPosts']).toEqual(false);
  });

  it('should test function getPosts', () => {

    const dummyData: IPost[] = [
      {
        "userId": 1,
        "id": 1,
        "title": "suntprehenderit",
        "body": "quia et suscipet architecto"
      }
    ];

    const httpGetSpy: jasmine.Spy<any> = spyOn(httpClient, 'get')
      .and.returnValue(of(dummyData));

    service.getPosts();

    expect(service['postsSubs'].value.length).toEqual(1);
    expect(httpGetSpy).toHaveBeenCalled();
  });

  it('should test function getPosts when throw an error', () => {
    const httpGetSpy: jasmine.Spy<any> = spyOn(httpClient, 'get')
      .and.returnValue(throwError('Server error occured!'));

    service.getPhotos();

    expect(service['photosSubs'].value.length).toEqual(0);
    expect(httpGetSpy).toHaveBeenCalled();

  });

  it('should test function getPostById', () => {
    const dummyPost: IPost = {
      userId: 1,
      id: 1,
      body: 'Hello World',
      title: 'testing Angular'
    }
    let postid = 1;
    service.getPostById(postid).subscribe(post => {
      expect(post).toEqual(dummyPost);
    });

    const request = httpMock.expectOne(`${URLS.POSTS}/${postid}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  });

  it('should test function getCommentById', () => {
    const dummyComment: IComment[] = [
      {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "utem quasi\nreiciendis et nam sapiente accusantium"
      },
      {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "ggggggg"
      }
    ]
    let postId = 1;
    service.getCommentsById(postId).subscribe(comment => {
      expect(comment).toEqual(dummyComment);
    });

    const request = httpMock.expectOne(`${URLS.POSTS}/${postId}/comments`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyComment);
  });
  /*
   *---------------------------------------------------------------------
   */

  it('should test function getUserById', () => {
    const dummyUser: IUser = {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
    service.getUserById(dummyUser.id).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${URLS.USERS}/${dummyUser.id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });



  it('should test function getUserById when throw an error', () => {
    const dummyUser: IUser = {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
    const msgError = "Error the user ID doesn't exist";

    service.getUserById(dummyUser.id).subscribe(
      (error: any) => {
        expect(error).toEqual(msgError);
      }
    );

    const request = httpMock.expectOne(`${URLS.USERS}/${dummyUser.id}`);
    expect(request.request.method).toBe('GET');
    request.flush(msgError, { status: 404, statusText: 'Not Found' });
  });

  /**
   * ----------------------------------------------------------------
   */

  it('should test function getPhotos', () => {
    const dummyData: IPhoto[] = [{
      "id": 1,
      "albumId": 1,
      "title": "Leanne Graham",
      "url": "majablog.com",
      "thumbnailUrl": "majablog.com/thumbnailUrl.png"
    }];

    const httpGetSpy: jasmine.Spy<any> = spyOn(httpClient, 'get')
      .and.returnValue(of(dummyData));

    service.getPhotos();

    expect(service['photosSubs'].value.length).toEqual(1);
    expect(httpGetSpy).toHaveBeenCalled();
  });

  it('should test function getPhotos when throw an error', () => {
    const httpGetSpy: jasmine.Spy<any> = spyOn(httpClient, 'get')
      .and.returnValue(throwError('There occurred a server error!'));

    service.getPhotos();

    expect(service['photosSubs'].value.length).toEqual(0);
    expect(httpGetSpy).toHaveBeenCalled();
  });

  // it('should test function getPhotos if previously called', () => {
  //   const dummyData: IPhoto[] = [{
  //     "id": 1,
  //     "albumId": 1,
  //     "title": "Leanne Graham",
  //     "url": "majablog.com",
  //     "thumbnailUrl": "majablog.com/thumbnailUrl.png"
  //   }];
  //   service['photosSubs'].next(dummyData);

  //   const httpGetSpy = spyOn(httpClient, 'get');
  //   //: jasmine.Spy<any>
  //   service.getPhotos();

  //   expect(service['photosSubs'].value.length).toEqual(1);
  //   expect(httpGetSpy).not.toHaveBeenCalled();
  // });

  afterEach(() => {
    httpMock.verify();
  });

});
