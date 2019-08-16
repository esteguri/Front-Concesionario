import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import Swal from 'sweetalert2'
import { EmpleadoModel } from '../../../../models/empleado.model';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent implements OnInit {

  cargando = false;
  empleados:any[] = []

  constructor(private apiConcesionario:ApiConcesionarioService) { }

  ngOnInit() {
    this.cargando=true
    setTimeout(()=>{
      this.consultarEmpleados();
    },800)
  }

  consultarEmpleados(){

    this.apiConcesionario.consultarEmpleados().subscribe( (response:any) => {
      if(response.error == "500"){
        this.cargando=false
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        this.empleados = response
        this.cargando=false
      }
    });
  
  }

  consultarId(input:any){
    if(input.value == "" || isNaN(input.value)){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarEmpleadoXId(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        var resp = []
        resp.push(response)
        this.empleados = resp
      }
    });

  }

  consultarCedula(input:any){
    if(input.value == "" || input.value.length < 3 ){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarEmpleadoXCedula(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        var resp = []
        resp.push(response)
        this.empleados = resp
      }
    });

  }

  borrarEmpleado(empleado:EmpleadoModel, i:number){

    Swal.fire({
      title:"¿Esta Seguro?",
      text: "Esta seguro que desea eliminar el empleado " + empleado.nombre + " " + empleado.apellido,
      type: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        
        this.apiConcesionario.borrarEmpleado(empleado.id).subscribe((response:any)=>{
          if(response.error == "500"){
            Swal.fire({
              title: "Oops...",
              text: 'Error al eliminar el Empleado, verifique las dependencias',
              type:'error'
            })
          }else{
            this.empleados.splice(i,1)
          }
        });
      }
    })

  }

}
