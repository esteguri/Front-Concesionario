import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoModel } from '../models/auto.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConcesionarioService {

  private url = "http://localhost:8080/Concesionario"

  constructor(private http:HttpClient) { }

  consultarAutoXMarca(termino:string){
    return this.http.get(this.url+`/api/auto?search=marca&marca=${termino}`,{})
    // return this.http.get("https://reqres.in/api/users?page=2")

  }

  consultarAutoXFechaIngreso(termino:string){
    return this.http.get(this.url+`/api/auto?search=ingreso&ingreso=${termino}`,{})
    // return this.http.get("https://reqres.in/api/users?page=1")
  }

  consultarAutoXEmpleado(termino:string){
    return this.http.get(this.url+`/api/auto?search=empleado&empleado=${termino}`,{})
    // return this.http.get("https://reqres.in/api/users?page=3")
  }

  consultarAutoXPrecio(termino:string){
    return this.http.get(this.url+`/api/auto?search=precio&precio=${termino}`,{})
    // return this.http.get("https://reqres.in/api/users?page=1")
  }

  consultarAutoXId(termino:string){
    return this.http.get(this.url+`/api/auto?search=id&id=${termino}`,{})
    // return this.http.get("https://reqres.in/api/users/2")
  }
  
  consultarAutos(){
    return this.http.get(this.url+"/api/auto?search=autos",{})
    // return this.http.get("https://reqres.in/api/users?page=1")
  }

  insertarAuto(json:AutoModel){
    return this.http.post(this.url+`/api/auto?nombre=${json.nombre}&descripcion=${json.descripcion}&precio=${json.precio}&placa=${json.placa}&fecha_ingreso=${json.fecha_ingreso}&marca=${json.marca}&id_empleado=${json.id_empleado}`,{})
    // return this.http.get("https://reqres.in/api/users?page=1")
  }

  actualizarAuto(json:AutoModel){
    return this.http.put(this.url+`/api/auto?id=${json.id}&nombre=${json.nombre}&descripcion=${json.descripcion}&precio=${json.precio}&placa=${json.placa}&fecha_ingreso=${json.fecha_ingreso}&marca=${json.marca}&id_empleado=${json.id_empleado}`,{})
    // return this.http.get("https://reqres.in/api/users?page=1")
  }

  consultarEmpleados(){
    return this.http.get(this.url+"/api/empleado?search=empleados",{})
    // return this.http.get("https://reqres.in/api/users?page=1")
  }


}
