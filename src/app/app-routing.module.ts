import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ActivitiesComponent } from './activities/activities.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './_helpers/auth.guard';
const routes: Routes = [
  {
    path: '',component: RegisterComponent
  },
  {
    path: 'login',component: LoginComponent
  },
  {
    path: 'activities',component: ActivitiesComponent
  },
  {
    path: 'dashboard',component: DashboardComponent,  canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
