import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MostrarComponent} from "./paginas/mostrar/mostrar.component";
import {RegistroComponent} from "./paginas/registro/registro.component";
import {HomeComponent} from "./paginas/home/home.component";
import {PrincipalComponent} from "./paginas/principal/principal.component"
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { CambioPassComponent } from './paginas/cambio-pass/cambio-pass.component';
import { PerfilSecComponent } from './paginas/perfil-sec/perfil-sec.component';
import { BusquedaComponent } from './paginas/busqueda/busqueda.component';
import { ForoComponent } from './paginas/foro/foro.component';

const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"home", component:HomeComponent},
  {path:"registro", component:RegistroComponent},
  {path:"mostrar", component:MostrarComponent},
  {path:"principal", component:PrincipalComponent},
  {path:"perfil", component:PerfilComponent},
  {path:"cambio_pass", component:CambioPassComponent },
  {path:"perfil_sec", component:PerfilSecComponent  },
  {path:"busqueda", component:BusquedaComponent},
  {path:"foro", component:ForoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
