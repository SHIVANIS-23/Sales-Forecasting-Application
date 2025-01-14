import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  {
    path:'homepage',component:HomepageComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'sign-up',component:SignUpComponent
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'',redirectTo:'/homepage',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


