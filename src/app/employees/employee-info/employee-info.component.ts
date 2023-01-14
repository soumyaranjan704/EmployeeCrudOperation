import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmployeeApiService } from '../employee-api.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeActionComponent } from '../employee-action/employee-action.component';

export interface DialogData {
	action: string;
	data: any;
	empId: any;
	controls: any;
}

@Component({
	selector: 'app-employee-info',
	templateUrl: './employee-info.component.html',
	styleUrls: ['./employee-info.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class EmployeeInfoComponent implements OnInit {

	public employees: any = [];
	public empId: any = null;
	public action: any = 'add';

	constructor(
		public router: Router,
        public route: ActivatedRoute,
        public employeeApiService: EmployeeApiService,
        public toastr: ToastrManager,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.getAllEmployees();
	}

	getAllEmployees() {
        this.employeeApiService.getAllEmployeesData().subscribe(async (response?: any) => {
            console.log('Get all employees data response isss:', response);
            if (response && response['data']) {
				this.employees = response['data'];
            } else {
                this.getAlertMessage('error', response.message);
            }
        }, (error?: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
        });
	}

	getAlertMessage(status?: any, message?: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            showCloseButton: true
        });
        Toast.fire({
            icon: status,
            title: message
        });
    }

	openActionDialog(task?: any, empData?: any): void {
		const finalEmpData = task == 'update' ? [empData['fname'],empData['lname'],empData['dob'],empData['emailId'],empData['dept'],empData['profileIcon']] : [];

		let modalViewTemplate: any = (task == 'add' || task == 'update') ? EmployeeFormComponent : EmployeeActionComponent;

		const dialogRef = this.dialog.open(modalViewTemplate, {
			width: '500px',
			height: 'auto',
			data: { action: task, data: finalEmpData, empId: Number(empData['empId']), controls: [] },
			panelClass: 'my-dialog'
		});

		dialogRef.afterClosed().subscribe((result?: any) => {
			console.log('The dialog was closed', result);
			if (result) {
				this.getAllEmployees();
			}
		});
	}
}
