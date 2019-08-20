import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoModel } from '../../../../models/empleado.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: []
})

export class EmpleadoComponent implements OnInit {

  empleado = new EmpleadoModel();
  title:string;
  sucursales:any[] = []
  constructor(private apiConcesionario:ApiConcesionarioService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.consultarSucursales();
    const id = this.route.snapshot.paramMap.get('id');
    if(id=="nuevo"){
      this.title = "Nuevo"
    }else{

      this.apiConcesionario.consultarEmpleadoXId(id).subscribe( (resp:any) => {
        if(resp.error){
          this.router.navigate(['/empleados'])
        }else{
          this.empleado = resp;
          this.title = resp.nombre + " " + resp.apellido;
        }
      })
    }

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

  guardar(form:NgForm){
    if(form.status == "INVALID"){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique los campos',
        type:'error'
      })
      return;
    }

    if(this.empleado.cedula.toString().length < 5 || this.empleado.cedula.toString().length > 10){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique la cedula, debe ser valida',
        type:'error'
      })
      return;
    }

    if(!this.empleado.id){
      this.apiConcesionario.consultarEmpleadoXCedula(this.empleado.cedula).subscribe( (response:any)=>{
        if(response.error == "500"){
          this.apiConcesionario.insertarEmpleado(this.empleado).subscribe( (response:any)=>{
           
              if(response.error == "200"){
                Swal.fire({
                  title: this.empleado.nombre + ' ' + this.empleado.apellido,
                  text: 'Se inserto el empleado correctamente',
                  type:'success'
                })
              }else{
                Swal.fire({
                  title: "Oops...",
                  text: 'Ocurrio un error al insertar',
                  type:'error'
                })
              }
          })
        } else{
          Swal.fire({
            title: "Oops...",
            text: 'La cedula ya existe',
            type:'error'
          })
        } 
      })
    }else{

      this.apiConcesionario.actualizarEmpleado(this.empleado).subscribe( (response:any)=>{

        if(response.error == "200"){
          Swal.fire({
            title: this.empleado.nombre + ' ' + this.empleado.apellido,
            text: 'Se actualizo el empleado de manera exitosa',
            type:'success'
          })
        }else{
          Swal.fire({
            title: "Oops...",
            text: 'Ocurrio un error al actualizar',
            type:'error'
          })
        }
    })
      
    } 
  }


}
