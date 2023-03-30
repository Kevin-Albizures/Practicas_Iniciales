import { Component, OnInit } from '@angular/core';
import {ServicioClienteService} from '../../servicios/servicio-cliente.service'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit {
  formulario:FormGroup;

  constructor(private form:FormBuilder, private servicio:ServicioClienteService, private router: Router){
    this.formulario = this.form.group({
      registro_academico:['',Validators.required],
      correo: ['',Validators.required],
      pass: ['',Validators.required]
    });
  }

  ngOnInit():void{
    
  }


  modificarPass(){
    this.servicio.ModificarPass  ({
      Registro: parseInt(this.formulario.get("registro_academico")?.value),
      Correo: this.formulario.get("correo")?.value,
      NuevaPass: this.formulario.get("pass")?.value

    }).subscribe(respuesta => {

      if(respuesta.Estado == true){
        alert("Se modifico correctamente la contraseña");
        this.router.navigate(['/home']);
      }else{
        alert("Error al modificar la contraseña");
      }


      console.log(respuesta);
    });
  }  


}
