/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DataService } from '../services/data.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let dataService: DataService;

  // describe('', () => {
  //   beforeEach(() => {
  //     TestBed.configureTestingModule({
  //       imports: [RouterTestingModule],
  //       declarations: [ListPostsComponent],
  //       providers: [
  //         { provide: ActivatedRoute, useValue: { params: of([{ userID: 'testPathNaN' }]), }, },
  //       ]
  //     }).compileComponents();

  //   });

  //   beforeEach(() => {
  //     TestBed.inject(ActivatedRoute);
  //   });

  //   it('should test for activated route', () => {
  //     fixture = TestBed.createComponent(ListPostsComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   })
  // })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [UserComponent],
      providers: [DataService],
      schemas: [NO_ERRORS_SCHEMA]
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
  });

  it('should test subscribe method in getUser', fakeAsync(() => {
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
    let getUserByIdSpy = spyOn(dataService, 'getUserById').and.returnValue(of(mockUser));
    let SubSpy = spyOn(dataService.getUserById(mockUser.id), 'subscribe')
    let spyTitle = spyOn(component['titleService'], 'setTitle');

    component.getUser();

    tick();
    expect(getUserByIdSpy).toHaveBeenCalledBefore(SubSpy);
    expect(SubSpy).toHaveBeenCalled();
    dataService.getUserById(mockUser.id).subscribe((_: any) => {
      expect(spyTitle).toHaveBeenCalled();
    })

  }));

  it('should test execution within subscribe', () => {
    component.getUser();
    expect(component.user).toEqual(jasmine.anything())
  })

});
