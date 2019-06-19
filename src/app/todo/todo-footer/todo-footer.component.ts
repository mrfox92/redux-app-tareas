import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../model/todo.model';
import * as fromTodo from '../todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    //  Obtenemos el filtro actual
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes( state.todos );
    });
  }

  cambiarFiltro( filtro: fromFiltro.filtrosValidos ) {

    const accion = new fromFiltro.SetFiltroAction( filtro );
    this.store.dispatch( accion );
  }

  contarPendientes( todos: Todo[] ) {
    /* Realizamos el conteo mediante la funcion filter
    la cual retorna un nuevo arreglo con los elementos que cumplen una condicion especificada y la propiedad length */
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  limpiarCompletados() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch( accion );
  }

}
