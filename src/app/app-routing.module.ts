import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicQuestionnaireComponent } from './dynamic-questionnaire/dynamic-questionnaire.component';
import { MainComponent } from './main/main.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
    },
    {
        path: 'question',
        // component: QuestionnaireComponent,
        component: DynamicQuestionnaireComponent,
    },
    {
        path: '',
        redirectTo: 'question',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor() { }
}