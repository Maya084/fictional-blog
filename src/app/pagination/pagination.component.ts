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
  `]
})
export class PaginationComponent implements OnInit {

  @Input() total: number = 1;
  @Output() onPageChange = new EventEmitter<number>();

  currentPage = 1;
  rangeNumbers: number[] = [];

  constructor() { }

  ngOnInit() {
    if (this.total <= 1) {
      return;
    }
    this.setRangeNumbers();
  }

  setRangeNumbers() {
    const cPage = this.currentPage - 1;
    this.rangeNumbers = Array.from({ length: this.total }, (_, i) => i + 1)
      .slice(cPage, 3 + cPage);
    console.log(this.rangeNumbers, this.total);
  }

  selectPage(i: number): void {
    console.log(i);
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


