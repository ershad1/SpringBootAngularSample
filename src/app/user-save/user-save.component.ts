import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../service/user.service';
import {ApiService} from '../service/api.service';
import {NotificationService} from '../service/notification.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.css']
})
export class UserSaveComponent {

  constructor(public userService: UserService,
              private apiService: ApiService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<UserSaveComponent>) {


  }

  onClear() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
  }

  onSubmit() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('id').value) {
        this.apiService.createEntity(UserService.URL, this.userService.form.value).subscribe(
          (data) => {
            this.notificationService.success('Created successfully');
            this.onClose();
          },
          (error) => this.notificationService.warn('! Error')
        );
      } else {
        this.apiService.updateEntity(UserService.URL, this.userService.form.value).subscribe(
          (data) => {
            this.notificationService.success('Updated successfully');
            this.onClose();
          },
          (error) => this.notificationService.warn('! Error'),
        );
      }
    }
  }

  onClose() {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
  }
}
