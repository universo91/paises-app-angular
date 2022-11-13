import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v2';


  constructor( private http: HttpClient) { }

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flag,population');
  }

  buscarPais(termino: string) : Observable<Country[]>{

    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });

    /* return this.http.get(url)
            .pipe(
              // catchError devuelve un observable, entonces con of que es una funcion
              // genereamos un observable, basicamente esa es su tarea, el cual transforma
              // lo que sea en un nuevo observable.
              catchError( err => of([]))
            ); */
  }
  buscarCapital(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorAlpha(id:string) : Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  buscarRegion( region: string): Observable<Country[]> {

    const url = `${ this.apiUrl }/regionalbloc/${ region }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }
}
