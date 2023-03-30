import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service';
import {Cliente} from '../../interfaces/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})


export class MostrarComponent implements OnInit  {

  objeto = this.servicioCliente.devolver();
  nombreUsuario = this.objeto.Nombre;
  datosComentario:Array<any>=[];
  idUsuario = this.objeto.Registro_A;


  constructor(private servicioCliente:ServicioClienteService, private router: Router){}

  ngOnInit():void{
    this.servicioCliente.ConsultarComentarios().subscribe(datos=>{
      for (let i=0; i<datos.length; i++){

          let fechaISO = datos[i].Fecha;
          let fecha = new Date(fechaISO);
          let fechaFormateada = fecha.toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
          datos[i].Fecha=fechaFormateada;
          this.datosComentario.push(datos[i]);
       
        
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


  buscar(dato : number){
    if(dato ==this.idUsuario){

      this.router.navigate(['/perfil']);

    }else {

      this.servicioCliente.BuscarUsuario ({
        Registro: dato
    
      }).subscribe(respuesta => {
        console.log(respuesta);
  
  
        if(respuesta.Estado == false){
          alert("No se encuentra usuario con esos datos");
          console.log(this.servicioCliente.ingresarAplicativo(respuesta))
        } else{
          this.router.navigate(['/perfil_sec']);
          this.servicioCliente.encapsular2(respuesta.Usuario);
        }
        
  
      });

    }
  }  


  buscar2(dato : number){
  this.servicioCliente.BuscarComentarioUnico ({
    Id_CometarioUnico: dato

  }).subscribe(respuesta => {
    console.log(respuesta);


    if(respuesta.Estado == false){
      alert("No se encuentra usuario con esos datos");
      console.log(this.servicioCliente.ingresarAplicativo(respuesta))
    } else{
      this.router.navigate(['/foro']);
      this.servicioCliente.encapsular3(respuesta.ComentarioP);
    }
    

  });
  }

}