import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [`
    .pagination {
      display: flex;
      justify-content: center;
      justify-items: center;
      margin: 18px 0 34px;
    }
    .pagination > .mat-mini-fab:first-child,
    .pages .mat-mini-fab {
      margin-right: 12px;
    }
    .pages .mat-mini-fab {
      background-color: transparent;
      box-shadow: none;
      color: #000;
    }
    .pages .mat-mini-fab.active {
      color: #3f51b5;
      box-shadow: 0px 1px 18px 0px rgb(0 0 0 / 12%);
    }
  `]
})
export class PaginationComponent implements OnInit {

  @Input() page!: number;
  @Input() total: number = 1;
  @Output() onPageChange = new EventEmitter<number>();

  currentPage = 1;
  rangeNumbers: number[] = [];
  limitRange = 3;

  constructor() { }

  ngOnInit() {
    if (this.page) { this.currentPage = this.page; }
    if (this.total <= 1) { return; }
    this.setRangeNumbers();
  }

  setRangeNumbers() {
    const cPage = this.currentPage <= 1 ||
                  this.currentPage >= this.total
                    ? this.currentPage - 1
                    : this.currentPage - 2;
    
    const calculateTotal = this.total - cPage;
    const checkIsLessThanLimitRange = calculateTotal <= 3;
    
    // Generate list of number starting from 0 to 9 from Input just number 9
    this.rangeNumbers = Array.from({ length: this.total }, (_, i) => i + 1)
      .slice(checkIsLessThanLimitRange ?
              this.total - this.limitRange : cPage,
              checkIsLessThanLimitRange ?
              this.total : this.limitRange + cPage
      );
  }

  selectPage(i: number): void {
    if (this.currentPage === i) { return; }
    this.currentPage = i;
    this.onPageChange.emit(this.currentPage);
    this.setRangeNumbers();
  }

  prevPage(): void {
    if (this.currentPage <= 1) {
      this.currentPage = 1;
      this.onPageChange.emit(this.currentPage);
      this.setRangeNumbers();
      return;
    }
    this.currentPage--;
    this.onPageChange.emit(this.currentPage);
    this.setRangeNumbers();
  }

  nextPage(): void {
    if (this.currentPage >= this.total) {
      this.currentPage = this.total;
      this.onPageChange.emit(this.currentPage);
      this.setRangeNumbers();
      return;
    }
    this.currentPage++;
    this.onPageChange.emit(this.currentPage);
    this.setRangeNumbers();
  }

}


