import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})


export class PerfilComponent implements OnInit {
  formulario:FormGroup;
  mod =false;
  objeto = this.servicioCliente.devolver();
  nombreUsuario = this.objeto.Nombre;
  idUsuario = this.objeto.Registro_A;
  creditos =0;

  datosCurso:Array<any>=[];

  constructor(private servicioCliente:ServicioClienteService, private router: Router, private form:FormBuilder){

    this.formulario = this.form.group({
      registro_academico:[ this.objeto.Registro_A ,Validators.required],
      nombre:[this.objeto.Nombre ,Validators.required],
      apellidos: [this.objeto.Apellidos,Validators.required],
      pass: [this.objeto.Pass,Validators.required],
      correo: [this.objeto.Correo,Validators.required],

      registro_academico2:[ this.objeto.Registro_A ,Validators.required],
      nombre2:[this.objeto.Nombre ,Validators.required],
      apellidos2: [this.objeto.Apellidos,Validators.required],
      pass2: [this.objeto.Pass,Validators.required],
      correo2: [this.objeto.Correo,Validators.required]
    });

  }

  ngOnInit():void{

    this.servicioCliente.ConsultarCursos().subscribe(datos=>{
      for (let i=0; i<datos.length; i++){

        if(datos[i].Id_Creador==this.idUsuario){
          this.creditos=this.creditos + datos[i].Creditos
          this.datosCurso.push(datos[i]);
        }
        
      }
    });

    
  }


  modificarCliente(){
    this.servicioCliente.ModificarClientes ({
      Registro_A: parseInt(this.objeto.Registro_A),
      Nombre: this.formulario.get("nombre")?.value,
      Apellidos: this.formulario.get("apellidos")?.value,
      Pass: this.formulario.get("pass")?.value,
      Correo: this.formulario.get("correo")?.value

    }).subscribe(respuesta => {
      console.log(respuesta);
      if(respuesta.Estado==true) {
        alert("Cambios realizados con éxito");
        this.router.navigate(['/home']);
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

  navegarPrincipal(){
    this.router.navigate(['/principal']);
  }

  modificarInfo(){
    this.mod = !this.mod;
    console.log(this.mod);
  }


}
