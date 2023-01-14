import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EmployeeApiService {

	public employeeAPIUrl: any = 'https://ml.thelightbulb.ai/api/employees';

	constructor(
		private http: HttpClient
	) { }

	getAllEmployeesData() {
        return this.http.get<any>(this.employeeAPIUrl);
    }

	addorUpdateEmployeeData(data?: any, id?: any, action?: any) {
		if (action == 'add') {
			return this.http.post<any>(this.employeeAPIUrl, data);
		} else {
			return this.http.put<any>(this.employeeAPIUrl + `/${id}`, data);
		}
	}

	deleteEmployeeData(id?: any) {
		return this.http.delete<any>(this.employeeAPIUrl + `/${id}`);
	}
}
