import { Component, OnInit, Input }   from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { FormData }                   from '../data/formData.model';
import { FormDataService }            from '../data/formData.service';

@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Thanks for staying tuned!';
    @Input() formData: FormData;
    isFormValid: boolean = false;

    constructor(private formDataService: FormDataService, private httpClient:HttpClient) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    submit() {
        alert('User Created!');
        this.httpClient.post('https://my-json-server.typicode.com/internetjonathan/json-faker-directory/users/',this.formData)
        .subscribe((data:any) =>{
          console.log(data);
        })
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    }
}
