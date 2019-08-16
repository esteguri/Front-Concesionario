import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalModel } from 'src/app/models/sucursal.model';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html'
})
export class SucursalComponent implements OnInit {

  sucursal = new SucursalModel();
  title:string;
  constructor(private apiConcesionario:ApiConcesionarioService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id=="nuevo"){
      this.title = "Nuevo"
    }else{

      this.apiConcesionario.consultarSucursalXId(id).subscribe( (resp:any) => {
        if(resp.error){
          this.router.navigate(['/sucursales'])
        }else{
          this.sucursal = resp;
          this.title = resp.nombre;
        }
      })
    }

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

    if(!this.sucursal.id){
      this.apiConcesionario.insertarSucursal(this.sucursal).subscribe( (response:any)=>{
       
          if(response.error == "200"){
            Swal.fire({
              title: this.sucursal.nombre,
              text: 'Se inserto la sucursal correctamente',
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

      this.apiConcesionario.actualizarSucursal(this.sucursal).subscribe( (response:any)=>{

        if(response.error == "200"){
          Swal.fire({
            title: this.sucursal.nombre,
            text: 'Se actualizo la sucursal de manera exitosa',
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
