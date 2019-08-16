import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { HomeComponent } from './components/pages/home/home.component';
import { AutosComponent } from './components/pages/autos/autos/autos.component';
import { AutosConsultasComponent } from './components/pages/autos/autos-consultas/autos-consultas.component';
import { AutoComponent } from './components/pages/autos/auto/auto.component';

const routes:Routes = [
  {path:'home', component: HomeComponent},
  {path:'autos', component: AutosComponent},
  {path:'autos-consultas', component: AutosConsultasComponent},
  {path:'auto/:id', component: AutoComponent},
  {path:'**', pathMatch: "full", redirectTo:"home"}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true})
   ],
   exports:[
     RouterModule
   ]
})
export class AppRoutingModule { }
