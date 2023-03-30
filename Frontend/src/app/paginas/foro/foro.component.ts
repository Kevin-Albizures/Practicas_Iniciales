import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service';
import {Cliente} from '../../interfaces/cliente';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  formulario:FormGroup;

  objeto = this.servicio.devolver();
  nombreUsuario = this.objeto.Nombre;
  idUsuario = this.objeto.Registro_A;

  comentariosFinales:Array<any>=[];
  m = false;


  comentarioPrincipal = this.servicio.devolver3();
  catedratico= this.comentarioPrincipal.Catedratico;
  curso= this.comentarioPrincipal.Curso;
  creador= this.comentarioPrincipal.Creador;
  fecha2= this.comentarioPrincipal.Fecha;
  com = this.comentarioPrincipal.Comentario;


  fechaISO = this.fecha2;
  fecha = new Date(this.fechaISO);
  fechaFormateada = this.fecha.toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});



  constructor(private servicio:ServicioClienteService, private router: Router, private form:FormBuilder){
    this.formulario = this.form.group({
      comentarioSegundario:['',Validators.required],

    });
  }

  ngOnInit():void{
  }

  crearSubcomentario(){

    this.servicio.CrearSubcomentarios ({
      Comentario: this.formulario.get("comentarioSegundario")?.value,
      Id_ComentarioPri: this.comentarioPrincipal.Id,
      Nombre_Usuario: this.nombreUsuario

    }).subscribe(respuesta => {
      console.log(respuesta);

      if(respuesta.Estado == true){
        alert("Sub-Comentario creado correctamente");
        this.formulario.get("comentarioSegundario")?.setValue("");

      }else {
        alert("Datos inválidos para la creación");
      }
    });
  }  


  buscarSubcomentarios(){
    this.servicio.BuscarSubcomentarios  ({
      Dato: this.comentarioPrincipal.Id
    }).subscribe(respuesta => {
      console.log("valores");
      this.m = true;
      console.log(respuesta);
      this.comentariosFinales= respuesta.Lista;
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

}
