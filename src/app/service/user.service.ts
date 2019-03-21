import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  static URL = environment.api.server + environment.api.users;

  form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.compose(([Validators.required, Validators.minLength(3), Validators.maxLength(100)]))],
    description: [''],
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: [''],
      description: ['']
    });
  }

  populateForm(entity) {
    this.form.patchValue(entity);
  }

}
