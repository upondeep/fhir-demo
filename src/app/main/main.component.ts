import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { Patient } from '../model/patient.model';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  searchForm: FormGroup;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  columnDefs;
  defaultColDef;
  loading: boolean = false;

  rowData: Patient[] = [];

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onSearch() {
    console.log("this.searchForm: ", this.searchForm.value);
    this.loading = true;
    let name = this.searchForm.value['name'];
    let date = this.searchForm.value['date'];
    this.apiService.searchPatientByNameAndBirthDate(name, date).subscribe(res => {
      console.log("Search Mayor:", res);
      this.transformRowData(res);
    }, err => { },
      () => { this.loading = false; });
  }

  disableSearch(): boolean {
    return this.searchForm.invalid || this.loading;
  }

  buildForm() {
    this.searchForm = this.fb.group({
      name: ['Mayer', [Validators.pattern('[^0-9]*'), Validators.required]],
      // date: ['1980-03-10', Validators.compose([Validators.pattern('([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))'), Validators.required])],
      // date: ['1980-03-10', Validators.compose([Validators.pattern('(([1-9]|1[0-2])\/([1-9]|[12]\d|3[01])\/[12]\d{3})'), Validators.required])],
      date: ['1980-03-10', Validators.required],
    });
  }

  transformRowData(response) {
    let now: Date = new Date();
    this.apiService.requestTime.next(now);
    let result = [];
    (response['entry'] as {}[]).forEach(e => {
      result.push({
        name: e['resource']['name'] ? e['resource']['name'][0]['text'] ? e['resource']['name']['text'] : `${(e['resource']['name'][0]['given'] as string[]).join(' ')} ${e['resource']['name'][0]['family'] || ''}` : '',
        gender: e['resource']['gender'] || '',
        birthDate: e['resource']['birthDate'] || '',
        data: e,
      });
    });
    this.rowData = result;
  }

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) {
    this.columnDefs = [
      { field: 'name', headerName: 'Name' },
      { field: 'gender', headerName: 'Gender' },
      { field: 'birthDate', headerName: 'Birth Date' },
    ];
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      flex: 1
    };
  }

  ngOnInit() {
    this.buildForm();
    this.loading = true;
    this.apiService.getPatientsBetweenAge(60, 65).subscribe(
      data => {
        console.log(data);
        this.transformRowData(data);
      }, err => { },
      () => { this.loading = false; }
    );
  }

}
