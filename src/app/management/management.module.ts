import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { CourseregComponent } from './coursereg/coursereg.component';
import { VeiwregComponent } from './veiwreg/veiwreg.component';
import { PrintregComponent } from './printreg/printreg.component';
import { BiodataComponent } from './biodata/biodata.component';
import { SettingComponent } from './setting/setting.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { IncourseComponent } from './incourse/incourse.component';
import { CoursehistoryComponent } from './coursehistory/coursehistory.component';
import { ProcessComponent } from './process/process.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component'

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    CourseregComponent,
    VeiwregComponent,
    PrintregComponent,
    BiodataComponent,
    SettingComponent,
    LogoutComponent,
    IncourseComponent,
    CoursehistoryComponent,
    ProcessComponent,
    PopUpComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule
  ],
  exports:[
    DashboardComponent,
    ProfileComponent,
    CourseregComponent,
    VeiwregComponent,
    IncourseComponent,
    CoursehistoryComponent,
    ProcessComponent,
    PrintregComponent,
    BiodataComponent,
    SettingComponent,
    LogoutComponent,
    MatIconModule
  ]
})
export class ManagementModule { }
