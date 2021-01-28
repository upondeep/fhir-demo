import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
    },
    {
        path: 'question',
        component: QuestionnaireComponent,
    },
    {
        path: '',
        redirectTo: 'main',
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