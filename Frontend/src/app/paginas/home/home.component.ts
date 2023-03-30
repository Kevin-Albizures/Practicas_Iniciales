import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formulario:FormGroup;
  

  constructor(private form:FormBuilder, private servicio:ServicioClienteService, private router: Router){
    this.formulario = this.form.group({
      registro_academico:['',Validators.required],
      pass: ['',Validators.required]
    });
  }

  ngOnInit(){
    
  }

  navegar(){
    this.router.navigate(['/registro']);
  }

  infoLogin(){
    this.servicio.Login ({
      Registro: this.formulario.get("registro_academico")?.value,
      Pass: this.formulario.get("pass")?.value
  
    }).subscribe(respuesta => {
      console.log(respuesta);
      
      if(respuesta.Estado == false){
        alert("No se encuentra usuario con esos datos");
        console.log(this.servicio.ingresarAplicativo(respuesta))
      } else{
        this.router.navigate(['/principal']);
        this.servicio.encapsular(respuesta.Usuario);
      }

    });

  }  


}
