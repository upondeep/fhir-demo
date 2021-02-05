import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GENDER } from '../enum/gender.enum';
import { MARITIAL } from '../enum/maritial-status.enum';
import { Option } from '../model/option.interface';
import { QuestionNode } from '../model/question.interface';

const genderOption = [
  { value: GENDER.MALE, viewValue: 'Male' },
  { value: GENDER.FEMALE, viewValue: 'Female' },
];

const countryOption = [
  { value: 'US', viewValue: 'US' },
  { value: 'CA', viewValue: 'CA' },
];

const maritalOption = [
  { value: MARITIAL.MARRIED, viewValue: 'Married' },
  { value: MARITIAL.SINGLE, viewValue: 'Single' },
];
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() items: QuestionNode;
  options: Option[];
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const text = this.form.get('text').value;
    if (/gender/i.test(text)) {
      this.options = genderOption;
    } else if (/country/i.test(text)) {
      this.options = countryOption;
    } else if (/marital/i.test(text)) {
      this.options = maritalOption;
    }
    if (this.form.get('type').value != 'group') {
      this.form.addControl("answer", this.fb.control('', Validators.required));
    }
    console.log("this.formGroup", this.form);
  }

}
