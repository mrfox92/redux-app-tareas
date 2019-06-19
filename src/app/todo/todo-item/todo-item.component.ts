import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  public chkField: FormControl;
  public txtInput: FormControl;
  public editando: boolean;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.chkField = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );
    //  console.log( this.todo );

    this.chkField.valueChanges.subscribe( () => {
      const accion = new ToggleTodoAction( this.todo.id );
      this.store.dispatch( accion );
    });
  }

  editar() {
    this.editando = true;
    //  se seleciona el texto del item para editar
    setTimeout( () => this.txtInputFisico.nativeElement.select(), 1);

  }

  terminarEdicion() {
    this.editando = false;
    //  Validamos que el input no venga vacio
    if (this.txtInput.invalid) {
      return;
    }
    //  Validamos que el texto del sea distinto al que tiene actualmente para realizar la modificacion
    if ( this.txtInput.value === this.todo.texto ) {
      return;
    }
    //  Una vez pasada las validaciones entonces creamos la accion
    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    //  se debe hacer el dispatch y disparar la accion para realizar la modificacion del texto( pasar el id)
    this.store.dispatch( accion );
  }

  borrarTodo() {
    const accion = new BorrarTodoAction( this.todo.id );
    this.store.dispatch( accion );
  }
}
