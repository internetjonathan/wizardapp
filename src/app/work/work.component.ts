import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../data/formData.service';
import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';


@Component ({
    selector:     'mt-wizard-work',
    templateUrl: './work.component.html'
})

export class WorkComponent implements OnInit {
    title = 'Select a Role:';
    workType: string;
    form: any;

    work$: Object;

    constructor(private router: Router, private formDataService: FormDataService, private data: FormDataService) {
    }


        ngOnInit() {

        this.data.getRoles().subscribe(
          data => {this.work$ = data;
          console.log(this.work$);
        });
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setWork(this.workType);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['/personal']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {

            this.router.navigate(['/result']);
        }
    }
}
