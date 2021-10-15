/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IPost, IPostPaginated } from '../models/interfaces';
import { DataService } from '../services/data.service';
import { ListPostsComponent } from './list-posts.component';


describe('ListPostsComponent', () => {
  let component: ListPostsComponent;
  let fixture: ComponentFixture<ListPostsComponent>;
  let dataServiceSpy: any;
  let router: any;

  const mockPost = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  } as IPost;

  beforeEach(() => {
    dataServiceSpy = jasmine.createSpyObj('DataService',
      ['getPaginatedPosts', 'getPosts', 'getUsers', 'getPhotos'],
    );

    dataServiceSpy.users$ = of([]);
    dataServiceSpy.photos$ = of([]);
    dataServiceSpy.posts$ = of([]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListPostsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },

      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test openPost function', () => {

    spyOn(router, 'navigate').withArgs(['/posts', mockPost.id]);
    component.openPost(mockPost);
    expect(router.navigate).toHaveBeenCalledWith(['/posts', mockPost.id]);
  });

  it('should test changePage', () => {
    const newPostPage = 3;
    spyOn(router, 'navigate');
    dataServiceSpy.getPaginatedPosts.and.returnValue({
      data: [], page: newPostPage, total: 1
    })
    component.changePage(newPostPage);
    expect(component.postPage).toEqual(newPostPage);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/posts'], { queryParams: { page: newPostPage } });
  })

  it('should test subscribe posts for path favorites when data length is 0', () => {
    const unsubscribeSpy = spyOn<any>(component['subs']['posts'], 'unsubscribe');
    const spySetPosts = spyOn<any>(component, 'onSetPosts')

    component.subscribePosts();

    dataServiceSpy.posts$.subscribe((_: any) => {
      expect(spySetPosts).not.toHaveBeenCalled();
    });
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should test subscribe posts for path favorites when data length is > 0', () => {
    const unsubscribeSpy = spyOn<any>(component['subs']['posts'], 'unsubscribe');
    const spySetPosts = spyOn<any>(component, 'onSetPosts')
    dataServiceSpy.posts$ = of(
      [{
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }]);
    component.subscribePosts();

    dataServiceSpy.posts$.subscribe((_: any) => {
      expect(spySetPosts).toHaveBeenCalled();
    });
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should test onSetPosts for path posts and there is no id', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('posts');
    const expectedData = [mockPost];
    dataServiceSpy.getPaginatedPosts.and.returnValue({
      data: expectedData,
      page: 1,
      total: Math.ceil(expectedData.length / 1)
    } as IPostPaginated);

    component.onSetPosts(expectedData);
    expect(component.posts.length).toEqual(1);
    expect(component.postPage).toEqual(1);
    expect(component.isFavoriteUrl).toEqual(false);
    expect(dataServiceSpy.getPaginatedPosts).toHaveBeenCalled();
  })

  it('should test onSetPosts for path favorites', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('favorites');
    const pom = [mockPost];
    component.onSetPosts(pom);
    expect(component.isFavoriteUrl).toEqual(true);
    expect(dataServiceSpy.getPaginatedPosts).not.toHaveBeenCalled();
  })

  it('should test onSetPosts for path NOT favorites', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('posts');
    component.postId = 1;
    const pom = [mockPost];
    component.onSetPosts(pom);
    expect(component.isFavoriteUrl).toEqual(false);
    expect(dataServiceSpy.getPaginatedPosts).not.toHaveBeenCalled();
  })

  // it('should test subscribe posts for path favorites', () => {
  //   const mockedPosts = [{
  //     "userId": 1,
  //     "id": 1,
  //     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //   }, {
  //     "userId": 1,
  //     "id": 2,
  //     "title": "qui est esse",
  //     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  //   }];

  //   const unsubscribeSpy = spyOn<any>(component['subs']['posts'], 'unsubscribe');

  //   spyOn<any>(dataServiceSpy, 'posts$').and.returnValue(of(mockedPosts))
  //   const spySetPosts = spyOn<any>(component, 'onSetPosts').withArgs(mockedPosts)

  //   component.subscribePosts();

  //   console.log('*********************');
  //   console.log('******dataService ---->', dataServiceSpy.posts$);

  //   dataService.posts$.subscribe(_ => {
  //     expect(spySetPosts).toHaveBeenCalled();
  //   })

  //   expect(unsubscribeSpy).toHaveBeenCalled();
  //   expect().toHaveBeenCalled();
  //   const subscribeSpy: jasmine.Spy<any> = spyOn(component.subscribePosts(), 'subscribe')
  //     .and.returnValue(of(mockedPosts));
  //   spyOnProperty(router, 'url', 'get').and.returnValue('favorites');
  //   console.log(router.url);
  //   console.log(includes(router.url, 'favorites'));
  //   const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['getFavoriteValue']);
  //   expect(component.onInitializePosts).toEqual(false);
  //   expect(component.isFavoriteUrl).toEqual(true);
  //   expect(localStorageSpy.getFavoriteValue).toHaveBeenCalled();
  // });

  // it('should test openPost', () => {
  //   instantiateComponent();
  //   const mockedPost = {
  //     "userId": 1,
  //     "id": 1,
  //     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //   }
  //   // spyOn(router, 'navigate');
  //   component.openPost(mockedPost);
  //   expect(router.navigate).toHaveBeenCalledOnceWith(['/posts', mockedPost.id])
  // })



});
