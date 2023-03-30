import { Component } from '@angular/core';
import { ServicioClienteService } from './servicios/servicio-cliente.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  
  constructor(private servicio:ServicioClienteService){
    
  }

 
}
