import { Injectable } from '@angular/core';
import { FormData, Personal } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid = false;
    private isWorkFormValid = false;

    constructor(private workflowService: WorkflowService, private http: HttpClient, private httpClient: HttpClient) {
    }

    getPersonal(): Personal {
        // Return the Personal data
        const personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email
        };
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    // getWork() {
    //     // Return the work type
    //     // return this.formData.work;
    //     return this.http.get('https://raw.githubusercontent.com/roycecorp/challenge/master/roles.json');
    // }

    // getWork(){
    //   return this.http.get('https://raw.githubusercontent.com/roycecorp/challenge/master/roles.json');
    // }

    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getRoles(){
      return this.httpClient.get('https://my-json-server.typicode.com/internetjonathan/json-faker-directory/work');
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        // this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        this.isPersonalFormValid = this.isWorkFormValid = false;

        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid ;
    }
}
