import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
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
	selector: 'app-employee-form',
	templateUrl: './employee-form.component.html',
	styleUrls: ['./employee-form.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class EmployeeFormComponent implements OnInit {

	public employeeForm: FormGroup;
	public empId: any = null;
	public uploadedProfileIcon: any = null;
	@ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;

	constructor(
		public dialogRef: MatDialogRef<EmployeeFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public formBuilder: FormBuilder,
		public router: Router,
        public route: ActivatedRoute,
        public employeeApiService: EmployeeApiService,
        public toastr: ToastrManager,
	) { }

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		this.initiateForm();
		this.getEmployeeData(this.data);
	}

	initiateForm() {
		return this.employeeForm = new FormGroup({
			firstName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
			lastName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
			dateOfBirth: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
			email: new FormControl(null, [Validators.required]),
			// phone: new FormControl(null, [Validators.required]),
			department: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
			// profileImage: new FormControl(null, [Validators.required])
		});	
	}

	getEmployeeData(empData?: any) {
		console.log('Modal empData isss:', empData);

		empData['controls'] = ['firstName','lastName','dateOfBirth','email','department'];
		this.uploadedProfileIcon = empData['data'][5] || null;
		this.empId = empData && (empData['action'] == 'update' || empData['action'] == 'delete') ? empData['empId'] : null;

		if (empData && empData['action'] == 'update') {
			let id: any = 0;
			for (const item of empData['controls']) {
				this.setFormValues(item, empData['data'][id]);
				id = id + 1;
			}
		}
	}

	setFormValues(controlName?: any, value?: any) {
		this.employeeForm.controls[controlName].setValue(value);
		this.employeeForm.controls[controlName].updateValueAndValidity();
	}

	getFormValues(controlName?: any) {
		return this.employeeForm.controls[controlName].value;
	}

	myError(controlName?: string, errorName?: string) {
		return this.employeeForm.controls[controlName].hasError(errorName);
	}

	onNoClick(form?: any, event?: any): void {
		this.resetForm(form);
		this.dialogRef.close(event);
	}

	onSelectFile(event?: any) {
		console.log('Selectd file event isss:', event);
		this.uploadedProfileIcon = event.target.files[0]['name'];
	}

	addOrUpdateNewEmployee(form?: any) {
		if (this.setFormValidation(form)) {
			return this.getAlertMessage('error', 'Please fill the required fields.');
		}

		const employeePayload = {
			fname: this.getFormValues('firstName'),
			lname: this.getFormValues('lastName'),
			emailId: this.getFormValues('email'),
			dept: this.getFormValues('department'),
			dob: moment(this.getFormValues('dateOfBirth')).format('YYYY-MM-DD'),
			profileIcon: this.uploadedProfileIcon
		}

		console.log('Post payload to add/update employee data isss:', employeePayload);

        this.employeeApiService.addorUpdateEmployeeData(employeePayload, this.empId, this.data['action']).subscribe(async (response?: any) => {
            console.log('Get added/updated employee data response isss:', response);
            if (response && response['status'] == 'ok') {
				// const successMessage = this.data['action'] == 'add' ? 'New Employee added successful' : 'Employee updated successful';
				this.getAlertMessage('success', response['message']);
				this.onNoClick(form, true);
            } else {
				// const errorMessage = this.data['action'] == 'add' ? 'Error while adding new employee' : 'Error while updating employee';
                this.getAlertMessage('error', response['message']);
            }
        }, (error?: any) => {
            this.getAlertMessage('warning', 'Network failed, Please try again.');
        });
	}

	setFormValidation(form?: any) {
		if (form['invalid'] || !this.uploadedProfileIcon) {
			return true;
		} else {
			return false;
		}
	}

	resetForm(form?: any) {
		form.reset();
		this.empId = null;
		this.fileInputRef.nativeElement.value = null;
		this.uploadedProfileIcon = null;
		this.initiateForm();
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
