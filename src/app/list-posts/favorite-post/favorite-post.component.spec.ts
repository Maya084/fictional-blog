/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritePostComponent } from './favorite-post.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FavoritePostComponent', () => {
  let component: FavoritePostComponent;
  let fixture: ComponentFixture<FavoritePostComponent>;
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritePostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    service = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test function likePost for a post that is already liked', () => {    
    const postid = 1;    
    const spyIsFavorite = spyOn(component, 'isFavorited')
                            .withArgs(postid)
                            .and.returnValue(true);
    spyOn(service, 'unfavoritePost').withArgs(postid);

    component.favoritePost(postid);

    expect(service.unfavoritePost).toHaveBeenCalledOnceWith(postid);
    expect(spyIsFavorite).toHaveBeenCalled();
  });

  it('should test function likePost for a post that is not already liked', () => {    
    const postid = 1;    
    const spyIsFavorite = spyOn(component, 'isFavorited')
                            .withArgs(postid)
                            .and.returnValue(false);
    spyOn(service, 'favoritePost').withArgs(postid);

    component.favoritePost(postid);

    expect(service.favoritePost).toHaveBeenCalledOnceWith(postid);
    expect(spyIsFavorite).toHaveBeenCalled();
  });

  it('should test function likePost for a post that is already liked', () => {    
    const postid = 1;    
    const spyIsFavorite = spyOn(service, 'isFavorite')
                            .withArgs(postid)
                            .and.returnValue(true);

    const app = component.isFavorited(postid);

    expect(app).toBeTruthy();
    expect(spyIsFavorite).toHaveBeenCalled();
  });

  it('should test function likePost for a post that is already liked', () => {    
    const postid = 1;    
    const spyIsFavorite = spyOn(service, 'isFavorite')
                            .withArgs(postid)
                            .and.returnValue(false);

    const app = component.isFavorited(postid);

    expect(app).toBeFalsy();
    expect(spyIsFavorite).toHaveBeenCalled();
  });

});
