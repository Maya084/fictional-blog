/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IComment } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';

import { CommentsPostComponent } from './comments-post.component';
describe('comments post componenet ', () => {

  const mockComments: IComment[] = [{
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidentium"
  }]

  describe('CommentsPostComponent with valid path id', () => {

    let component: CommentsPostComponent;
    let fixture: ComponentFixture<CommentsPostComponent>;
    let dataServiceSpy: any;

    beforeEach(() => {

      dataServiceSpy = jasmine.createSpyObj('DataService', ['getCommentsById'])

      dataServiceSpy.getCommentsById.and.returnValue(of(mockComments));

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [CommentsPostComponent],
        providers: [
          { provide: DataService, useValue: dataServiceSpy },
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { params: { postID: '1' } } }
          }
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(CommentsPostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should test getting comments', () => {
      component.getComments();

      expect(component.comments).toEqual(mockComments);
      expect(dataServiceSpy.getCommentsById).toHaveBeenCalled();
    })
  });


  describe('CommentsPostComponent with invalid path id', () => {
    let component: CommentsPostComponent;
    let fixture: ComponentFixture<CommentsPostComponent>;
    let dataServiceSpy: any;

    beforeEach(() => {

      dataServiceSpy = jasmine.createSpyObj('DataService', ['getCommentsById'])

      dataServiceSpy.getCommentsById.and.returnValue(of(mockComments));

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [CommentsPostComponent],
        providers: [
          { provide: DataService, useValue: dataServiceSpy },
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { params: { postID: 'null' } } }
          }
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(CommentsPostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should test getting comments', () => {
      component.getComments();

      expect(component.comments.length).toEqual(0);
      expect(dataServiceSpy.getCommentsById).not.toHaveBeenCalled();
    })
  });

})

