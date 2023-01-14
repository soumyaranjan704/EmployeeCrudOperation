import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmployeeApiService } from '../employee-api.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	action: string;
	data: any;
	empId: any;
	controls: any;
}

@Component({
	selector: 'app-employee-action',
	templateUrl: './employee-action.component.html',
	styleUrls: ['./employee-action.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class EmployeeActionComponent implements OnInit {

	public empId: any = null;

	constructor(
		public dialogRef: MatDialogRef<EmployeeActionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public router: Router,
        public route: ActivatedRoute,
        public employeeApiService: EmployeeApiService,
        public toastr: ToastrManager,
	) { }

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		console.log('Modal empData isss:', this.data);
		this.empId = this.data['empId'] || null;
	}

	onNoClick(event?: any): void {
		this.empId = null;
		this.dialogRef.close(event);
	}

	deleteEmployee() {
        this.employeeApiService.deleteEmployeeData(this.empId).subscribe(async (response?: any) => {
            console.log('Get deleted employee data response isss:', response);
            if (response && response['status'] == 'ok') {
				// const successMessage = 'Employee deleted successful';
				this.getAlertMessage('success', response['message']);
				this.onNoClick(true);
            } else {
				// const errorMessage = 'Error while deleting employee';
                this.getAlertMessage('error', response['message']);
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
}
