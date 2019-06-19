import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { AgregarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl;

  constructor( private store: Store<AppState> ) {
    //  nos suscribimos al estado de la app
  }

  ngOnInit() {
    this.txtInput = new FormControl('', Validators.required);
  }

  agregarTodo() {

    if ( this.txtInput.invalid ) {
      return;
    }

    //  creamos la accion
    const accion = new AgregarTodoAction( this.txtInput.value );
    //  enviamos la accion
    this.store.dispatch( accion );

    //  vaciar caja de texto
    this.txtInput.setValue('');

  }

}
