/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { IPost, IUser } from '../models/interfaces';
import { DataService } from '../services/data.service';
import { PostComponent } from './post.component';

describe('PostComponent', () => {

  describe('With valid postId route argument', () => {

    const mockPost = {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    } as IPost;

    const mockUser = {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {},
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {}
    } as IUser;

    let component: PostComponent;
    let fixture: ComponentFixture<PostComponent>;
    let postServiceSpy: any;

    const postId = '1';

    beforeEach(() => {
      postServiceSpy = jasmine.createSpyObj('DataService',
                          ['getPostById', 'getUserById']);
      
      postServiceSpy.getPostById.withArgs(mockPost.id)
                                .and.returnValue(of(mockPost));

      postServiceSpy.getUserById.withArgs(mockUser.id)
                                .and.returnValue(of(mockUser));

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          TranslateModule.forRoot()
        ],
        declarations: [PostComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: DataService, useValue: postServiceSpy },
          {
            provide: ActivatedRoute,
            useValue: {snapshot: {params: {postID: postId}}}
          }
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should test getPost', () => {
      component.getPost();

      expect(component.post.id).toEqual(mockPost.id);
      expect(postServiceSpy.getPostById).toHaveBeenCalled();
      expect(postServiceSpy.getUserById).toHaveBeenCalled();
    })

  });

  describe('With invalid postId route argument', () => {
    let component: PostComponent;
    let fixture: ComponentFixture<PostComponent>;

    let postServiceSpy: any;
    const postId = -1;

    beforeEach(() => {
      postServiceSpy = jasmine.createSpyObj('DataService',
                          ['getPostById', 'getUserById']);

      postServiceSpy.getPostById.withArgs(postId)
                                .and.returnValue(throwError('Error'));

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          TranslateModule.forRoot()
        ],
        declarations: [PostComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: DataService, useValue: postServiceSpy },
          {
            provide: ActivatedRoute,
            useValue: {snapshot: {params: {postID: 'null'}}}
          }
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should test getPost', () => {
      component.getPost();

      expect(component.postId).toEqual(postId);
      expect(postServiceSpy.getPostById).toHaveBeenCalled();
      expect(postServiceSpy.getUserById).not.toHaveBeenCalled();
    })

  });

});
