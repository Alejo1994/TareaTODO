import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'user', component:UserComponent},
  {path:'task',component:TaskComponent},
  {path:'**',pathMatch:'full',redirectTo:'user'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
