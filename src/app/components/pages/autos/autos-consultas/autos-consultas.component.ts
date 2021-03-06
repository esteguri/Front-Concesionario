import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-autos-consultas',
  templateUrl: './autos-consultas.component.html',
  styles: []
})
export class AutosConsultasComponent implements OnInit {

  autos:any[] = [];
  empleados:any[] = [];

  constructor(private apiConcesionario:ApiConcesionarioService) { }

  ngOnInit() {
    this.consultarEmpleados();
  }

  consultarMarca(input:any){
    if(input.value == "" || input.value.length <3){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarAutoXMarca(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.autos = []

      }else{
        this.autos = response
      }
    });

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

    this.apiConcesionario.consultarAutoXFechaIngreso(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.autos = []        
      }else{
        this.autos = response
      }
    });  

  }

  consultarEmpleado(input:any){
    if(input.value == null || input.value == "" ){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarAutoXEmpleado(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.autos = [];
      }else{
        this.autos = response
      }
    });

  }

  consultarPrecio(input:any){
    if(input.value == "" || input.value.length < 4 || isNaN(input.value)){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarAutoXPrecio(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
        this.autos = []        
      }else{
        this.autos = response
        
      }
    });

  
  }

  consultarEmpleados(){
    this.apiConcesionario.consultarEmpleados().subscribe( (response:any) => {
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

}
