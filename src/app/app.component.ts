import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { ApiService } from '../app/services/api-service.service';
import { Patient } from './model/patient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';
  queryTime: Date;
  subscriptions: Subscription = new Subscription();
  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(this.apiService.requestTime.subscribe(res => {
      this.queryTime = res;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}


