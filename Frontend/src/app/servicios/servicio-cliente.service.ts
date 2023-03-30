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
  private usuario2:any = {};
  private comentario:any = {};


  servidor="http://localhost:4263"


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

  BuscarUsuario(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/buscarUsuario`, JSON.stringify(datos) , httpOptions);

  }

  BuscarComentario(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/buscarComentario`, JSON.stringify(datos) , httpOptions);

  }

  BuscarComentarioUnico(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/buscarComentarioUnico`, JSON.stringify(datos) , httpOptions);

  }

  CrearSubcomentarios(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/crearSubcomentarios`, JSON.stringify(datos) , httpOptions);

  }

  BuscarSubcomentarios(datos:any): Observable <any>{
    return this.servicio.post(`${this.servidor}/buscarSubcomentario`, JSON.stringify(datos) , httpOptions);

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


  encapsular2(usuario2:any){
    return this.usuario2 = usuario2;
  }

  devolver2(){
    return this.usuario2;
  }

  encapsular3(comentario:any){
    return this.comentario = comentario;
  }

  devolver3(){
    return this.comentario;
  }


}
