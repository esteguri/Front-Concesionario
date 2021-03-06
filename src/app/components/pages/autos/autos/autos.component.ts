import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import Swal from 'sweetalert2'
import { AutoModel } from 'src/app/models/auto.model';
@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styles: []
})
export class AutosComponent implements OnInit {

  cargando = false;
  autos:any[] = []

  constructor(private apiConcesionario:ApiConcesionarioService) { }

  ngOnInit() {
    this.cargando=true
    setTimeout(()=>{
      this.consultarAutos();
    },800)
  }

  consultarAutos(){

    this.apiConcesionario.consultarAutos().subscribe( (response:any) => {
      if(response.error == "500"){
        this.cargando=false
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        this.autos = response
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

    this.apiConcesionario.consultarAutoXId(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        var resp = []
        resp.push(response)
        this.autos = resp
      }
    });
    

  }

  consultarPlaca(input:any){
    if(input.value == "" || input.value.length != 6){
      Swal.fire({
        title: "Oops...",
        text: 'Verifique que el campo sea correcto',
        type:'error'
      })
      return;
    }

    this.apiConcesionario.consultarAutoXPlaca(input.value).subscribe( (response:any) => {
      if(response.error == "500"){
        Swal.fire({
          title: "Oops...",
          text: 'No existe',
          type:'info'
        })
      }else{
        var resp = []
        resp.push(response)
        this.autos = resp
      }
    });

  }  

  borrarAuto(auto:AutoModel, i:number){

    Swal.fire({
      title:"¿Esta Seguro?",
      text: "Esta seguro que desea eliminar el auto " + auto.marca + " " + auto.nombre,
      type: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        this.autos.splice(i,1)
        this.apiConcesionario.borrarAuto(auto.id).subscribe((response:any)=>{
          if(response.error == "500"){
            Swal.fire({
              title: "Oops...",
              text: 'Error al eliminar el Auto, verifique las dependencias',
              type:'error'
            })
          }else{
            this.autos.splice(i,1)
          }
        });
      }
    })

    
  }

  

}
