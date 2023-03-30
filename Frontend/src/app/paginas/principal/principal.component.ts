import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  formulario:FormGroup;
  formularioC:FormGroup;
  objeto = this.servicio.devolver();
  nombreUsuario = this.objeto.Nombre;
  idUsuario = this.objeto.Registro_A;


  constructor(private form:FormBuilder, private servicio:ServicioClienteService, private router: Router){
    this.formulario = this.form.group({
      curso:['',Validators.required],
      catedratico: ['',Validators.required],
      comentario: ['',Validators.required]
    });

    this.formularioC = this.form.group({
      cursoA:['',Validators.required],
      id_cursoA: ['',Validators.required],
      creditos: ['',Validators.required]
    });


  }

  ngOnInit(): void {}

  

  crearComentario(){

    this.servicio.CrearComentarios ({
      Creador: this.nombreUsuario,
      Id_Creador: parseInt(this.idUsuario),
      Curso: this.formulario.get("curso")?.value,
      Catedratico: this.formulario.get("catedratico")?.value,
      Comentario: this.formulario.get("comentario")?.value,
      Subcomentarios: null


    }).subscribe(respuesta => {
      console.log(respuesta);
      if(respuesta.Estado == true){
        alert("Comentario creado correctamente");

        this.formulario.get("curso")?.setValue("");
        this.formulario.get("catedratico")?.setValue("");
        this.formulario.get("comentario")?.setValue("");

      }else {
        alert("Datos inválidos para la creación");
      }
      
    });
  }  

  
  crearCurso(){

    this.servicio.CrearCursos ({
      Id_Curso: parseInt(this.formularioC.get("id_cursoA")?.value),
      Curso: this.formularioC.get("cursoA")?.value,
      Creditos: parseInt(this.formularioC.get("creditos")?.value),
      Id_Creador: parseInt(this.idUsuario)
      

    }).subscribe(respuesta => {
      console.log(respuesta);

      if(respuesta.Estado == true){
        alert("Curso creado correctamente");
        
        this.formularioC.get("cursoA")?.setValue("");
        this.formularioC.get("id_cursoA")?.setValue("");
        this.formularioC.get("creditos")?.setValue("");
      }else {
        alert("Datos inválidos para la creación");
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

  navegarHome(){
    this.router.navigate(['/home']);
  }

}
