import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { HomeComponent } from './components/pages/home/home.component';
import { AutosComponent } from './components/pages/autos/autos/autos.component';
import { AutosConsultasComponent } from './components/pages/autos/autos-consultas/autos-consultas.component';
import { AutoComponent } from './components/pages/autos/auto/auto.component';
import { SucursalesComponent } from './components/pages/sucursales/sucursales/sucursales.component';
import { SucursalComponent } from './components/pages/sucursales/sucursal/sucursal.component';
import { EmpleadoComponent } from './components/pages/empleados/empleado/empleado.component';
import { EmpleadosConsultasComponent } from './components/pages/empleados/empleados-consultas/empleados-consultas.component';
import { EmpleadosComponent } from './components/pages/empleados/empleados/empleados.component';

const routes:Routes = [
  {path:'home', component: HomeComponent},
  {path:'autos', component: AutosComponent},
  {path:'autos-consultas', component: AutosConsultasComponent},
  {path:'auto/:id', component: AutoComponent},
  {path:'sucursales', component: SucursalesComponent},
  {path:'sucursal/:id', component: SucursalComponent},
  {path:'empleados', component: EmpleadosComponent},
  {path:'empleados-consultas', component: EmpleadosConsultasComponent},
  {path:'empleado/:id', component: EmpleadoComponent},
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
