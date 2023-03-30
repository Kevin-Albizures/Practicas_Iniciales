import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { RegistroComponent } from './paginas/registro/registro.component';

import {HttpClientModule} from '@angular/common/http';
import { MostrarComponent } from './paginas/mostrar/mostrar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { CambioPassComponent } from './paginas/cambio-pass/cambio-pass.component';
import { PerfilSecComponent } from './paginas/perfil-sec/perfil-sec.component';
import { BusquedaComponent } from './paginas/busqueda/busqueda.component';
import { ForoComponent } from './paginas/foro/foro.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    MostrarComponent,
    PrincipalComponent,
    PerfilComponent,
    CambioPassComponent,
    PerfilSecComponent,
    BusquedaComponent,
    ForoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
