import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

/* pathMatch es similar a exact de react router */
const routes: Routes = [
  { path: '', component: PorPaisComponent, pathMatch: 'full'  },
  { path: 'region', component: PorRegionComponent },
  { path: 'capital', component: PorCapitalComponent },
  { path: 'pais/:id', component: VerPaisComponent },
  //si la ruta no existe, entonces por defecto que nos rediriga al principal, que es porpaiscomponent
  { path: '**', redirectTo: ''}
];
// forRoot es para rutas principales y forChild para rutas hijas
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
