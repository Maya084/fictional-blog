/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {

  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent], 
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentPage).toEqual(1);
    expect(component.rangeNumbers.length).toEqual(component.limitRange);
    expect(component.limitRange).toEqual(3);
  });

  it('should test ngOnInit for existing page', ()=>{
    component.page = 1;

    component.ngOnInit();

    expect(component.currentPage).toEqual(1);
  })

  it('should test ngOnInit for total < 1', ()=>{
    component.total = 0;
    spyOn(component, 'setRangeNumbers');

    component.ngOnInit();

    expect(component.setRangeNumbers).not.toHaveBeenCalled();
  })

  it('should test the select Page function', () => {
    const selectedPage = 2;
    const setRangeSpy = spyOn(component, 'setRangeNumbers');
    const pageChangeSpy = spyOn(component.onPageChange, 'emit');
    component.selectPage(selectedPage);
    expect(component.currentPage).toEqual(selectedPage);
    expect(pageChangeSpy).toHaveBeenCalledOnceWith(selectedPage);
    expect(setRangeSpy).toHaveBeenCalled();
  });

  it('should test the select Page function on same number', () => {
    const selectedPage = 1;
    const setRangeSpy = spyOn(component, 'setRangeNumbers');
    const pageChangeSpy = spyOn(component.onPageChange, 'emit');
    component.selectPage(selectedPage);
    expect(component.currentPage).toEqual(selectedPage);
    expect(pageChangeSpy).not.toHaveBeenCalledOnceWith(selectedPage);
    expect(setRangeSpy).not.toHaveBeenCalled();
  });


  it('should test previous Page function', () => {
    const currentPage = 2
    component.currentPage = currentPage;
    const onPageChangeSpy = spyOn(component.onPageChange, 'emit');
    const setRangeSpy = spyOn(component, 'setRangeNumbers');

    component.prevPage();

    expect(component.currentPage).toEqual(currentPage - 1);
    expect(onPageChangeSpy).toHaveBeenCalledOnceWith(currentPage - 1);
    expect(setRangeSpy).toHaveBeenCalledOnceWith();
  })

  it('should test previous Page function with page 1', () => {
    const currentPage = -2
    component.currentPage = currentPage;
    const onPageChangeSpy = spyOn(component.onPageChange, 'emit');
    const setRangeSpy = spyOn(component, 'setRangeNumbers');

    component.prevPage();

    expect(component.currentPage).toEqual(1);
    expect(onPageChangeSpy).toHaveBeenCalledOnceWith(1);
    expect(setRangeSpy).toHaveBeenCalledOnceWith();
  })

  it('should test next Page function', () => {
    component.total = 10;
    const currentPage = 2
    component.currentPage = currentPage;
    const onPageChangeSpy = spyOn(component.onPageChange, 'emit');
    const setRangeSpy = spyOn(component, 'setRangeNumbers');

    component.nextPage();

    expect(component.currentPage).toEqual(currentPage + 1);
    expect(onPageChangeSpy).toHaveBeenCalledOnceWith(currentPage + 1);
    expect(setRangeSpy).toHaveBeenCalledOnceWith();
  })

  it('should test next Page function with page total number', () => {
    component.total = 10;
    const currentPage = component.total;
    component.currentPage = currentPage;
    const onPageChangeSpy = spyOn(component.onPageChange, 'emit');
    const setRangeSpy = spyOn(component, 'setRangeNumbers');

    component.nextPage();

    expect(component.currentPage).toEqual(component.total);
    expect(onPageChangeSpy).toHaveBeenCalledOnceWith(component.total);
    expect(setRangeSpy).toHaveBeenCalledOnceWith();
  })


  it('should test setRangeNumbers function', () => {
    component.limitRange = 3;
    component.total = 10;
    for (let p = 1; p < component.total; p++) {
      component.currentPage = p;
      component.setRangeNumbers();
      // console.log(component.rangeNumbers);
      expect(component.rangeNumbers.length).toEqual(component.limitRange);
    }
    expect(component.rangeNumbers).toEqual([8, 9, 10]);
  })

});

