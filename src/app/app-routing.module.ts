import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ActivitiesComponent } from './activities/activities.component';
const routes: Routes = [
  {
    path: '',component: RegisterComponent
  },
  {
    path: 'activities',component: ActivitiesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
