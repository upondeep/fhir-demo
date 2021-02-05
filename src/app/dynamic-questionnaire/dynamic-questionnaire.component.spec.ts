import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicQuestionnaireComponent } from './dynamic-questionnaire.component';

describe('DynamicQuestionnaireComponent', () => {
  let component: DynamicQuestionnaireComponent;
  let fixture: ComponentFixture<DynamicQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
