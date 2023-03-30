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
    this.router.navigate(['/registro']);
  }

  navegarPerfil(){
    this.router.navigate(['/perfil']);
  }

  navegarPrincipal(){
    this.router.navigate(['/principal']);
  }

  retornarId(dato:any){
    this.servicioCliente.encapsularSec(dato);
    console.log("hola este es la id" + dato.Id_creador)
  }

}