/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DataService } from '../services/data.service';
import { UserComponent } from './user.component';

describe('user componenet ', () => {

  describe('UserComponent for valid url ', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let titleSpy: any;
    let dataServiceSpy: any;

    const mockUser = {
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

    beforeEach(() => {
      titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
      dataServiceSpy = jasmine.createSpyObj('DataService', ['getUserById', 'getPosts']);
      
      dataServiceSpy.getUserById.and.returnValue(of(mockUser));
      dataServiceSpy.posts$ = of(mockUser);

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [UserComponent],
        providers: [{ provide: DataService, useValue: dataServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => ({ userID: '1' }) } } },
        },
        { provide: Title, useValue: titleSpy },],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should test getUser', () => {
      // let SubSpy = spyOn(dataService.getUserById(mockUser.id), 'subscribe')
      component.getUser();

      expect(dataServiceSpy.getUserById).toHaveBeenCalled();
      expect(titleSpy.setTitle).toHaveBeenCalled();
      // expect(SubSpy).toHaveBeenCalled();
      // dataService.getUserById(mockUser.id).subscribe((_: any) => {
      //   expect(titleSpy.setTitle).toHaveBeenCalled();
      // })
    });



  });



  describe('UserComponent for invalid url', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let dataService: DataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [UserComponent],
        providers: [DataService,
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: { get: () => ({ userID: 'null' }) } } },
          }],
        schemas: [NO_ERRORS_SCHEMA],

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      dataService = TestBed.inject(DataService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.userID).toEqual(-1);
    });


  });

});
