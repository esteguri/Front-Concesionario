import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoModel } from '../models/auto.model';
import { EmpleadoModel } from '../models/empleado.model';
import { SucursalModel } from '../models/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConcesionarioService {

  private url = "http://localhost:8080/Concesionario"

  constructor(private http:HttpClient) { }
  
  consultarAutoXMarca(termino:string){
    return this.http.get(this.url+`/api/auto?search=marca&marca=${termino}`,{})
  }

  consultarAutoXFechaIngreso(termino:string){
    return this.http.get(this.url+`/api/auto?search=ingreso&ingreso=${termino}`,{})
  }

  consultarAutoXEmpleado(termino:string){
    return this.http.get(this.url+`/api/auto?search=empleado&empleado=${termino}`,{})
  }

  consultarAutoXPrecio(termino:string){
    return this.http.get(this.url+`/api/auto?search=precio&precio=${termino}`,{})
  }

  consultarAutoXId(termino:string){
    return this.http.get(this.url+`/api/auto?search=id&id=${termino}`,{})
  }

  consultarAutoXPlaca(termino:string){
    return this.http.get(this.url+`/api/auto?search=placa&placa=${termino}`,{})
  }

  
  consultarAutos(){
    return this.http.get(this.url+"/api/auto?search=autos",{})
  }

  insertarAuto(json:AutoModel){
    return this.http.post(this.url+`/api/auto?nombre=${json.nombre}&descripcion=${json.descripcion}&precio=${json.precio}&placa=${json.placa}&fecha_ingreso=${json.fecha_ingreso}&marca=${json.marca}&id_empleado=${json.id_empleado}`,{})
  }

  actualizarAuto(json:AutoModel){
    return this.http.put(this.url+`/api/auto?id=${json.id}&nombre=${json.nombre}&descripcion=${json.descripcion}&precio=${json.precio}&placa=${json.placa}&fecha_ingreso=${json.fecha_ingreso}&marca=${json.marca}&id_empleado=${json.id_empleado}`,{})
  }

  borrarAuto(id:number){
    return this.http.delete(this.url+`/api/auto?id=${id}`,{})
  }

  consultarEmpleados(){
    return this.http.get(this.url+"/api/empleado?search=empleados",{})
  }

  consultarSucursales(){
    return this.http.get(this.url+"/api/sucursal?search=sucursales",{})
  }

  consultarEmpleadoXFechaIngreso(termino:string){
    return this.http.get(this.url+`/api/empleado?search=ingreso&ingreso=${termino}`,{})
  }
  consultarEmpleadoXSucursal(termino:string){
    return this.http.get(this.url+`/api/empleado?search=sucursal&sucursal=${termino}`,{})
  }

  consultarEmpleadoXId(termino:string){
    return this.http.get(this.url+`/api/empleado?search=id&id=${termino}`,{})
  }

  consultarEmpleadoXCedula(termino:string){
    return this.http.get(this.url+`/api/empleado?search=cedula&cedula=${termino}`,{})
  }
  
  borrarEmpleado(id:number){
    return this.http.delete(this.url+`/api/empleado?id=${id}`,{})
  }

  insertarEmpleado(json:EmpleadoModel){
    return this.http.post(this.url+`/api/empleado?nombre=${json.nombre}&apellido=${json.apellido}&cedula=${json.cedula}&fecha_ingreso=${json.fecha_ingreso}&id_sucursal=${json.id_sucursal}`,{})
  }

  actualizarEmpleado(json:EmpleadoModel){
    return this.http.put(this.url+`/api/empleado?id=${json.id}&nombre=${json.nombre}&apellido=${json.apellido}&cedula=${json.cedula}&fecha_ingreso=${json.fecha_ingreso}&id_sucursal=${json.id_sucursal}`,{})
  }

  consultarSucursalXId(termino:string){
    return this.http.get(this.url+`/api/sucursal?search=id&id=${termino}`,{})
  }

  consultarSucursalXNombre(termino:string){
    return this.http.get(this.url+`/api/sucursal?search=nombre&nombre=${termino}`,{})
  }

  borrarSucursal(id:number){
    return this.http.delete(this.url+`/api/sucursal?id=${id}`,{})
  }

  insertarSucursal(json:SucursalModel){
    return this.http.post(this.url+`/api/sucursal?nombre=${json.nombre}&descripcion=${json.descripcion}`,{})
  }

  actualizarSucursal(json:SucursalModel){
    return this.http.put(this.url+`/api/sucursal?id=${json.id}&nombre=${json.nombre}&descripcion=${json.descripcion}`,{})
  }

}
