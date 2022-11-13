import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  pais! : Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    /** switchMap nos permite recibir un observable y regresar otro observable */
    this.activateRoute.params
      .pipe(
      /* recibe valor tipo observable - retorna otro observable */
        switchMap( ({ id }) => this.paisService.getPaisPorAlpha( id )),
        // tap realiza un efecto secundario
        tap( console.log )
      )
      .subscribe( pais => {
        console.log(pais);
        this.pais = pais;
      })

    //la propiedad params de activateRoute, nos permite accedar a a los parametros de nuestra ruta
      /* this.activateRoute.params
        .subscribe( ({ id }) => {
          this.paisService.getPaisPorAlpha(id)
            .subscribe( pais =>
              console.log(pais))
        }) */
  }

}
