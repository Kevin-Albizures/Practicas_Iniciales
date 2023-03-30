import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Cliente} from '../../interfaces/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  formulario:FormGroup;
  
  objeto = this.servicios.devolver();
  nombreUsuario = this.objeto.Nombre;
  idUsuario = this.objeto.Registro_A;

  comentariosFinales:Array<any>=[];
  comentariosSeleccionados:Array<any>=[];

  act = false;

  constructor(private servicios:ServicioClienteService, private router: Router, private form:FormBuilder){
    this.formulario = this.form.group({
      busqueda:['',Validators.required]
    });
  }

  ngOnInit():void{
    
  }


  buscarComentarios(){
    this.servicios.BuscarComentario  ({
      Dato: this.formulario.get("busqueda")?.value
    }).subscribe(respuesta => {
      console.log("valores");
      console.log(respuesta);
      this.comentariosSeleccionados= [];

      if(respuesta.Estado == true){
        for (let i=0; i<respuesta.Lista.length; i++){

          let fechaISO = respuesta.Lista[i].Fecha;
          let fecha = new Date(fechaISO);
          let fechaFormateada = fecha.toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
          respuesta.Lista[i].Fecha=fechaFormateada;
          this.comentariosSeleccionados.push(respuesta.Lista[i]);
       
        }
  
        this.comentariosFinales = this.comentariosSeleccionados

      }else{
        this.comentariosFinales= [];
        alert("No se encuentra datos con es valor");
      }



    });
  }  



  navegarMostrar(){
    this.router.navigate(['/mostrar']);
  }

  navegarBuscar(){
    this.router.navigate(['/busqueda']);
  }

  navegarPerfil(){
    this.router.navigate(['/perfil']);
  }

  navegarPrincipal(){
    this.router.navigate(['/principal']);
  }

  actualizar(){
    console.log(this.comentariosFinales)
    this.act = true;
    console.log("holas"+ this.act)

  }

  buscar(dato : number){
    if(dato ==this.idUsuario){

      this.router.navigate(['/perfil']);

    }else {

      this.servicios.BuscarUsuario ({
        Registro: dato
    
      }).subscribe(respuesta => {
        console.log(respuesta);
  
  
        if(respuesta.Estado == false){
          alert("No se encuentra usuario con esos datos");
          console.log(this.servicios.ingresarAplicativo(respuesta))
        } else{
          this.router.navigate(['/perfil_sec']);
          this.servicios.encapsular2(respuesta.Usuario);
        }
        
  
      });

    }
  }  

  buscar2(dato : number){
    this.servicios.BuscarComentarioUnico ({
      Id_CometarioUnico: dato
  
    }).subscribe(respuesta => {
      console.log(respuesta);
  
  
      if(respuesta.Estado == false){
        alert("No se encuentra usuario con esos datos");
        console.log(this.servicios.ingresarAplicativo(respuesta))
      } else{
        this.router.navigate(['/foro']);
        this.servicios.encapsular3(respuesta.ComentarioP);
      }
      
  
    });
    }

}
