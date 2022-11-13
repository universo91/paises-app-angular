import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  terminoABuscar: string = '';
  @Input() placeholder !: String;

  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  // Este evento se va a emitir cuendo se deje de escribir
  @Output() onDebaunce: EventEmitter<string> = new EventEmitter();

  //Ahora crearemos un observable manualmente( Subject)
  // La idea es que cuando se deje de escribir, se emita debuncer, para esto necesitamo
  // el metodo onInit
  debouncer: Subject<string> = new Subject();

  // Este metodo se dispara una unica vez, cuando el componente es creado,
  // Por lo tanto al subcribirnos al observable debouncer, posteriormente
  // ya podemos enviar datos medienta su metodo next
  // y mediante pipes que son una especie de tuberia  podemos transformar la data
  ngOnInit() {
    this.debouncer
      .pipe(
        // debounceTime es para indicar la cantidad de milisegundos que se desea esperar
        // antes de emitir el siguiente valor, es decir que solo si dejamos de escribir por un tiempo de
        // 300 milisegundos, entonces se enviara al next el valor del input.
        /**
         * Mientras se escriba continamente, el metodo teclaPresionada se estara ejecutando, a su
         * vez que termionABuscar ira almacenando el valor del input, y el metodo next
         * estara enviando ese valor al obsrvable, pero este ultimo, no emitira dicho valor
         * a menos que el tiempo que pase entre el penultimo y ultimo caracter sea de 300 milisegundos,
         * esto gracias a que debounceTime evita la emision a menos que se cumpla con la condicion de
         * 300ms entre el ultimo y el penultimo, es una especio de bloqueo temporal
         *
         */
        debounceTime(300)
      )
      .subscribe( valor => {
        //esto se ejecutara espues de no haber escrito por 300ms
        this.onDebaunce.emit( valor );
      });
  }

  buscar(): void {
    this.onEnter.emit(this.terminoABuscar);
  }

  teclaPresionada() {
    this.debouncer.next( this.terminoABuscar );
  }

}
