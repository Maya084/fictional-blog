import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: `<div [innerHTML]="snackbar" class="snackbar"> </div>`,
  styles: ['.snackbar{color: hotpink;}']
})
export class SnackbarComponent implements OnInit {
  snackbar!:string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.snackbar = data ;
    
  }

  ngOnInit() {
  }
}
