import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Cliente } from '../interfaces/cliente';
import { Comentario } from '../interfaces/comentario';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class ServicioClienteService {
  private ingresar:boolean = false;
  private usuario:any = {};
  private usuarioSec:any = {};


  servidor="http://localhost:4241"


  constructor(private servicio:HttpClient) { }

  ConsultarClientes(): Observable <any>{
    return this.servicio.get(`${this.servidor}/usuarios`);
   
  }


  CrearClientes(datos:Cliente): Observable <any>{
    return this.servicio.post(`${this.servidor}/crearClientes`, JSON.stringify(datos) , httpOptions);

  }

  Login(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/retornoUsuario`, JSON.stringify(datos) , httpOptions);

  }

  CrearComentarios(datos:Comentario): Observable <any>{
    return this.servicio.post(`${this.servidor}/crearComentarios`, JSON.stringify(datos) , httpOptions);

  }

  ConsultarComentarios(): Observable <any>{
    return this.servicio.get(`${this.servidor}/comentarios`);
   
  }


  CrearCursos(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/crearCursos`, JSON.stringify(datos) , httpOptions);

  }

  ConsultarCursos(): Observable <any>{
    return this.servicio.get(`${this.servidor}/cursos`);
   
  }

  ModificarClientes(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/modificarUsuario`, JSON.stringify(datos) , httpOptions);

  }

  ModificarPass(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/modificarPass`, JSON.stringify(datos) , httpOptions);

  }





  public ingresarAplicativo(obj:any):boolean{
    if(obj.Estado == true){
      this.ingresar = true;
    }

    return this.ingresar;
  }

  encapsular(usuario:any){
    return this.usuario = usuario;
  }

  devolver(){
    return this.usuario;
  }


  encapsularSec(usuario:any){
    return this.usuarioSec = usuario;
  }

  devolverSec(){
    return this.usuarioSec;
  }

}
