import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-empleados-consultas',
  templateUrl: './empleados-consultas.component.html',
  styles: []
})
export class EmpleadosConsultasComponent implements OnInit {

  sucursales:any[] = [];
  empleados:any[] = [];

  constructor(private apiConcesionario:ApiConcesionarioService) { }

  ngOnInit() {
    this.consultarSucursales();
  }

  consultarFecha(input:any){
    if(input.value == null || input.value == "" ){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarEmpleadoXFechaIngreso(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.empleados = []
      }else{
        this.empleados = response
      }
    });  
  }

  consultarSucursal(input:any){
    if(input.value == null || input.value == "" ){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarEmpleadoXSucursal(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.empleados = [];
      }else{
        this.empleados = response
      }
    });
  }

  consultarSucursales(){
    this.apiConcesionario.consultarSucursales().subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.sucursales = []
      }else{
        this.sucursales = response
      }
    });
  }

}
