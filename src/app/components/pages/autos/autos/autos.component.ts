import { Component, OnInit } from '@angular/core';
import { ApiConcesionarioService } from '../../../../services/api-concesionario.service';
import Swal from 'sweetalert2'
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

    // this.apiConcesionario.consultarAutos().subscribe( (response:any) => {
    //   if(response.data.error == "500"){
    //     this.cargando=false
    //     Swal.fire({
    //       title: "Oops...",
    //       text: 'No existe',
    //       type:'info'
    //     })
        
    //   }else{
    //     this.cargando=false
    //     this.autos = response.data
    //   }
    // });
  
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

    // this.apiConcesionario.consultarAutoXId(input.value).subscribe( (response:any) => {
    //   if(response.data.error == "500"){
    //     Swal.fire({
    //       title: "Oops...",
    //       text: 'No existe',
    //       type:'info'
    //     })
    //   }else{
    //     var resp = []
    //     resp.push(response.data)
    //     this.autos = resp
    //   }
    // });

  }

  

}
