//    Este archivo sirve para unificar todo los reducers de mi aplicacion

import { Todo } from './todo/model/todo.model';
import { ActionReducerMap } from '@ngrx/store';
//    Se realizan las importaciones bajo un alias, para manipular los reducer  a la hora de escalar la aplicacion
import * as fromTodo from './todo/todo.reducer';
import * as fromFilter from './filter/filter.reducer';

import * as fromFiltroActions from './filter/filter.actions';
//    Cada elemento de esta interface representara el estado inicial de la aplicacion
//    Ademas le pasamos las funciones reducers para cada elemento
export interface AppState {
    todos: Todo[];
    filtro: fromFiltroActions.filtrosValidos;
}

//    ActionReducerMap es de tipo generico
export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFilter.filtroReducer
};
