import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ToggleAllTodoAction } from './todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  completado = false;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
  }

  toggleAll() {
    this.completado = !this.completado;

    //  creamos la accion
    const accion = new ToggleAllTodoAction(this.completado);
    //  enviamos la accion
    this.store.dispatch( accion );
  }

}