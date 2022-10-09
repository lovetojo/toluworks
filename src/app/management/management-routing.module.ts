import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiodataComponent } from './biodata/biodata.component';
import { CoursehistoryComponent } from './coursehistory/coursehistory.component';
import { CourseregComponent } from './coursereg/coursereg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncourseComponent } from './incourse/incourse.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagementComponent } from './management.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PrintregComponent } from './printreg/printreg.component';
import { ProcessComponent } from './process/process.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { VeiwregComponent } from './veiwreg/veiwreg.component';

const routes: Routes = [{
  path: '',
  component: ManagementComponent,
  children:[{
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'coursereg',
    component: CourseregComponent
  },
  {
    path: 'veiwreg',
    component: VeiwregComponent
  },
  {
    path: 'printreg',
    component: PrintregComponent
  },
  {
    path: 'biodata',
    component: BiodataComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'process',
    component: ProcessComponent
  },
  {
    path: 'incourse',
    component: IncourseComponent
  },
  {
    path: 'coursehistory',
    component: CoursehistoryComponent
  },
  {
    path: 'popup',
    component: PopUpComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
