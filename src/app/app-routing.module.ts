import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmployeeInfoComponent } from './employees/employee-info/employee-info.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'employees',
		pathMatch: 'full'
	},
	{
		path: 'employees',
		component: EmployeeInfoComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
