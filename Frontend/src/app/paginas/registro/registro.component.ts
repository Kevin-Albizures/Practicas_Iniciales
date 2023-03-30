import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Cliente} from '../../interfaces/cliente';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent  implements OnInit {
  formulario:FormGroup;
  datoCliente:Array<Cliente>=[];
  constructor(private form:FormBuilder, private servicio:ServicioClienteService){
    this.formulario = this.form.group({
      registro_academico:['',Validators.required],
      nombre:['',Validators.required],
      apellidos: ['',Validators.required],
      pass: ['',Validators.required],
      correo: ['',Validators.required]
    });
  }

  

  ngOnInit():void{
    
  }

  crearCliente(){
    this.servicio.CrearClientes  ({
      Registro_A: parseInt(this.formulario.get("registro_academico")?.value),
      Nombre: this.formulario.get("nombre")?.value,
      Apellidos: this.formulario.get("apellidos")?.value,
      Pass: this.formulario.get("pass")?.value,
      Correo: this.formulario.get("correo")?.value

    }).subscribe(respuesta => {
      console.log(respuesta);

      if(respuesta.Estado == true){
        alert("Usuario creado correctamente");
        this.formulario.get("registro_academico")?.setValue("");
        this.formulario.get("nombre")?.setValue("");
        this.formulario.get("apellidos")?.setValue("");
        this.formulario.get("pass")?.setValue("");
        this.formulario.get("correo")?.setValue("");


      }else {
        alert("Datos inválidos para la creación");
      }
      
    });
  }  


}


