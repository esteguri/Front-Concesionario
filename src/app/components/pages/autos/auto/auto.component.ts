import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import { AutoModel } from '../../../../models/auto.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styles: []
})
export class AutoComponent implements OnInit {

  auto = new AutoModel();
  title:string;
  empleados:any[] = []
  constructor(private apiConcesionario:ApiConcesionarioService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.consultarEmpleados();
    const id = this.route.snapshot.paramMap.get('id');
    if(id=="nuevo"){
      this.title = "Nuevo"
    }else{

      this.apiConcesionario.consultarAutoXId(id).subscribe( (resp:any) => {
        if(resp.error){
          this.router.navigate(['/autos'])
        }else{
          this.auto = resp;
          this.title = resp.nombre;
        }
      })

      // this.apiConcesionario.consultarAutoXId(id).subscribe( (resp:any) => {
      //   if(resp.error){
      //     this.router.navigate(['/autos'])
      //   }else{
      //     this.auto.nombre = resp.data.first_name;
      //     this.auto.id = resp.data.id;
      //     this.auto.descripcion = resp.data.last_name;
      //     this.auto.precio = resp.data.id;
      //     this.auto.placa = resp.data.last_name;
      //     this.auto.fecha_ingreso = "2019-08-15";
      //     this.auto.marca = resp.data.last_name;
      //     this.auto.id_empleado = resp.data.id;
      //     this.title = resp.data.first_name;
      //   }
      // })


    }
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

    //  this.apiConcesionario.consultarEmpleados().subscribe( (response:any) => {
    //   if(response.data.error == "500"){
    //     Swal.fire({
    //       title: "Oops...",
    //       text: 'No existe',
    //       type:'info'
    //     })
    //   }else{
    //     this.empleados = response.data
    //   }
    // });

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

    if(!this.auto.id){
      this.apiConcesionario.insertarAuto(this.auto).subscribe( (response:any)=>{

          console.log(response)        
          if(response.error == "200"){
            this.auto.id = response.id;
            Swal.fire({
              title: this.auto.marca + ' ' + this.auto.nombre,
              text: 'Se inserto el auto correctamente',
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
    }else{

      this.apiConcesionario.actualizarAuto(this.auto).subscribe( (response:any)=>{
        console.log(response)
        if(response.error == "200"){
          Swal.fire({
            title: this.auto.marca + ' ' + this.auto.nombre,
            text: 'Se actualizo el auto de manera exitosa',
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
