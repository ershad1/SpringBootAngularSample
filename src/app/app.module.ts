import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSaveComponent } from './user-save/user-save.component';
import { UserListComponent } from './user-list/user-list.component';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    UserSaveComponent,
    UserListComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent, UserSaveComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
