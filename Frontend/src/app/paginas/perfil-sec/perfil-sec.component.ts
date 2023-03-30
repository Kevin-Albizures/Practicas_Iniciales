import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: 'app-perfil-sec',
  templateUrl: './perfil-sec.component.html',
  styleUrls: ['./perfil-sec.component.css']
})
export class PerfilSecComponent implements OnInit {
  objeto = this.servicioCliente.devolver();
  nombreUsuario = this.objeto.Nombre;
  idUsuario = this.objeto.Registro_A;

  objSec = this.servicioCliente.devolver2();
  idUsuarioSecundario = this.objSec.Registro_A;
  nombreUsuarioSecundario = this.objSec.Nombre;
  apellidosUsuarioSecundario = this.objSec.Apellidos;
  coreoUsuarioSecundario = this.objSec.Correo;
  creditos =0;
  datosCurso:Array<any>=[];

  constructor(private servicioCliente:ServicioClienteService, private router: Router, private form:FormBuilder){}



  ngOnInit():void{

    this.servicioCliente.ConsultarCursos().subscribe(datos=>{
      for (let i=0; i<datos.length; i++){

        if(datos[i].Id_Creador==this.idUsuarioSecundario){
          this.creditos=this.creditos + datos[i].Creditos
          this.datosCurso.push(datos[i]);
        }
        
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

  alv(){
    console.log(this.idUsuarioSecundario)
  }
}
