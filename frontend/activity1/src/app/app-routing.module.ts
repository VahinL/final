import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { TaskComponent } from './task/task.component';
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [
  {path:'reg',component:RegisterComponent},
  {path:'log',component:LoginComponent},
  {path:'view',component:ViewComponent},
  {path:'task/:userId',component:TaskComponent},
  {path:'edittask',component:EdittaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
