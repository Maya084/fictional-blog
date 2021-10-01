import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-examples-angular',
  templateUrl: './examples-angular.component.html',
  styleUrls: ['./examples-angular.component.scss']
})
export class ExamplesAngularComponent implements OnInit {

  showFiller = false;

  hidden = false;
  disabled = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  changeDisabled()
  {
    this.disabled= !this.disabled;
  }


  ngOnInit() {
  }

  

}
