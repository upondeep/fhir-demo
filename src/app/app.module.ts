import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { ResponseComponent } from './response/response.component';
import { DynamicQuestionnaireComponent } from './dynamic-questionnaire/dynamic-questionnaire.component';
import { QuestionComponent } from './question/question.component';
import { CUSTOM_DATE_FORMATS } from './shared/custome-date-format';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    MainComponent,
    ResponseComponent,
    DynamicQuestionnaireComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
