import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import Swal from 'sweetalert2'
import { SucursalModel } from '../../../../models/sucursal.model';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styles: []
})
export class SucursalesComponent implements OnInit {

  cargando = false;
  sucursales:any[] = []
  
  constructor(private apiConcesionario:ApiConcesionarioService) { }

  ngOnInit() {
    this.cargando=true
    setTimeout(()=>{
      this.consultarSucursales();
    },800)
  }

  consultarSucursales(){

    this.apiConcesionario.consultarSucursales().subscribe( (response:any) => {
      if(response.error == "500"){
        this.cargando=false
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        this.sucursales = response
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

    this.apiConcesionario.consultarSucursalXId(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        var resp = []
        resp.push(response)
        this.sucursales = resp
      }
    });

  }

  consultarNombre(input:any){
    if(input.value == "" || input.value.length < 3 ){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarSucursalXNombre(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        this.sucursales = response
      }
    });

  }

  borrarSucursal(sucursal:SucursalModel, i:number){

    Swal.fire({
      title:"¿Esta Seguro?",
      text: "Esta seguro que desea eliminar la sucursal " + sucursal.nombre,
      type: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        
        this.apiConcesionario.borrarSucursal(sucursal.id).subscribe((response:any)=>{
          if(response.error == "500"){
            Swal.fire({
              title: "Oops...",
              text: 'Error al eliminar la Sucursal, verifique las dependencias',
              type:'error'
            })
          }else{
            this.sucursales.splice(i,1)
          }
        });
      }
    })

  }

}