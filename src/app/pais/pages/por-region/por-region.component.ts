import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right: 0.4rem;
      margin-bottom: 0.4rem;
    }
  `]
})
export class PorRegionComponent {

  regiones: string[] = [
    'EU',
    'EFTA',
    'CARICOM',
    'PA',
    'AU',
    'USAN',
    'EEU',
    'AL',
    'ASEAN',
    'CAIS',
    'CEFTA',
    'NAFTA',
    'SAARC'
  ];

  regionActiva: string = '';
  paises: Country[] = [];

  constructor( private paisService: PaisService) { }

  activarRegion( region: string) {
    //para evitar buscar de nuevo cuando ya cargo los paises de dicha region
    if ( this.regionActiva === region ) return ;
    this.regionActiva = region;
    this.paisService.buscarRegion(region)
      .subscribe( {
        next: (paises) => {
          this.paises = paises
        },
        error: (err) => {
          this.paises = []
        }
      })
  }

  getClaseCSS( region: string) : string {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

 }
