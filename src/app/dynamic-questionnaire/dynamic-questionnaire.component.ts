import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionNode } from '../model/question.interface';
import questionnaireJson from '../../assets/questionnaire.json';
import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';
@Component({
  selector: 'app-dynamic-questionnaire',
  templateUrl: './dynamic-questionnaire.component.html',
  styleUrls: ['./dynamic-questionnaire.component.scss']
})
export class DynamicQuestionnaireComponent implements OnInit {
  questionForm: FormGroup;
  showResponse: boolean = false;
  responseObject: {};
  json;
  constructor(
    private fb: FormBuilder,
  ) {
    this.json = Object.assign({}, { item: questionnaireJson['item'] });
  }

  ngOnInit(): void {
    this.questionForm = this.buildForm(this.json);
    console.log("this.questionForm: ", this.questionForm);
  }

  buildForm(node: QuestionNode) {
    const group: { [id: string]: AbstractControl } = {};
    if (node.hasOwnProperty('type')) {
      group.type = new FormControl(node.type);
    }
    if (node.hasOwnProperty('linkId')) {
      group.linkId = new FormControl(node.linkId);
    }
    if (node.hasOwnProperty('text')) {
      group.text = new FormControl(node.text);
    }

    if (node.item) {
      group.item = this.fb.array(node.item.map(el => this.buildForm(el)))
    }

    return this.fb.group(group);
  }

  disableSubmit() {
    return this.questionForm.invalid;
  }

  onSubmit() {
    this.showResponse = true;
    this.responseObject = {
      "resourceType": "Questionnaire",
      "id": "f201",
      "url": "http://hl7.org/fhir/Questionnaire/f201",
      "status": "active",
      "subjectType": [
        "Patient"
      ],
      "date": "2010",
      item: this.questionForm.value['item'],
    };

    console.log('this.responseObject: ', this.responseObject);
  }
}
