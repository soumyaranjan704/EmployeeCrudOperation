import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { 
  MatFormFieldModule, 
  MatCardModule, 
  MatInputModule, 
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatButtonModule, 
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmployeeInfoComponent } from './employees/employee-info/employee-info.component';
import { DateChangePipe } from './employees/date-change.pipe';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { EmployeeApiService } from './employees/employee-api.service';
import { EmployeeActionComponent } from './employees/employee-action/employee-action.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    EmployeeInfoComponent,
    DateChangePipe,
    EmployeeFormComponent,
    EmployeeActionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CalendarModule,
    ToastrModule.forRoot(),
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatFormFieldModule, 
    MatCardModule, 
    MatInputModule, 
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SweetAlert2Module.forRoot(),
    Ng2SearchPipeModule
  ],
  entryComponents: [
    EmployeeFormComponent,
    EmployeeActionComponent
  ],
  providers: [
    EmployeeApiService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
