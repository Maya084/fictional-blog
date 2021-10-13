import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE_KEY } from 'src/assets/constants';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test the function on save to LocalStorage if it success', () => {
    const mockedData: number[] = [1, 2, 3, 4]
    spyOn(window.localStorage, 'setItem')
                      .withArgs(LOCAL_STORAGE_KEY, JSON.stringify(mockedData));

    service.saveToLocalStorage();

    expect(window.localStorage.setItem).toHaveBeenCalled()

  });

  it('should test the function getLocalStorage', () => {
    const mockedData: number[] = [1, 2, 3, 4];
    const lsSpyOn = spyOn(window.localStorage, 'getItem')
                      .withArgs(LOCAL_STORAGE_KEY)
                      .and.returnValue(JSON.stringify(mockedData))

    service.getLocalStorage();

    expect(service['favoritesSubs'].value).toEqual(mockedData);
    expect(lsSpyOn).toHaveBeenCalled();
  });

  it('should test function favoritePost with normal values', () => {
    const mockedDataFavorites: number[] = [1, 2, 3, 4];
    service['favoritesSubs'].next(mockedDataFavorites);
    const favoritePostId = 5;
    const spySaveToLocalStorage = spyOn(service, 'saveToLocalStorage');

    service.favoritePost(favoritePostId);

    expect(service['favoritesSubs'].value).toEqual([1,2,3,4,5]);
    expect(spySaveToLocalStorage).toHaveBeenCalledWith();
  })

  it('should test function favoritePost with NaN values', () => {
    const mockedDataFavorites: number[] = [1, 2, 3, 4];
    service['favoritesSubs'].next(mockedDataFavorites);
    let favoritePostId : any;
    const spySaveToLocalStorage = spyOn(service, 'saveToLocalStorage');

    service.favoritePost(favoritePostId);

    expect(service['favoritesSubs'].value).toEqual(mockedDataFavorites);
    expect(spySaveToLocalStorage).not.toHaveBeenCalledWith();
  })

  it('should test function unfavoritePost with normal values', () => {
    const mockedDataFavorites: number[] = [1,2,5,6,9,8];
    service['favoritesSubs'].next(mockedDataFavorites);
    let unfavoritePostId = 9;
    const spySaveToLocalStorage = spyOn(service, 'saveToLocalStorage');

    service.unfavoritePost(unfavoritePostId);

    expect(service['favoritesSubs'].value).toEqual([1,2,5,6,8]);
    expect(spySaveToLocalStorage).toHaveBeenCalledOnceWith();
  })

  it('should test function unfavoritePost with NaN values', () => {
    const mockedDataFavorites: number[] = [1, 2, 3, 4];
    service['favoritesSubs'].next(mockedDataFavorites);
    let unfavoritePostId: any;
    const spySaveToLocalStorage = spyOn(service, 'saveToLocalStorage');

    service.unfavoritePost(unfavoritePostId);

    expect(service['favoritesSubs'].value).toEqual(mockedDataFavorites);
    expect(spySaveToLocalStorage).not.toHaveBeenCalled();
  })


  it('should test function isFavorite for post Ids that exist', () => {
    
    const mockedDataFavorites = [1, 2, 3];
    service['favoritesSubs'].next(mockedDataFavorites);
    let postId = 3;

    const isFavorite = service.isFavorite(postId);

    expect(isFavorite).toEqual(true);
  })

  it('should test function isFavorite for post Ids that dont exist', () => {
   const mockedDataFavorites = [1, 2, 3];
    service['favoritesSubs'].next(mockedDataFavorites);
    let postId = 9;

    const isFavorite = service.isFavorite(postId);
    expect(isFavorite).toEqual(false);
  })


});
