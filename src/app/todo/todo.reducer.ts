import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

//    crearemos elementos para inicializar nuestra lista de Todos
const todo1 = new Todo('Ver documentacion Redux');
const todo2 = new Todo('Salir a trotar');
const todo3 = new Todo('Ver curso Redux y Angular');

//    modificamos el estado del item 2
todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

/* La clave esta en siempre regresar nuevos estados, nunca se debe mutar la informacion
anterior porque sino será imposible darle seguimiento a la informacion, ya que habremos mutado los datos
originales.
 */

export function todoReducer( state = estadoInicial, action: fromTodo.acciones ): Todo[] {

    switch ( action.type ) {
        case fromTodo.AGREGAR_TODO:
            //    creamos una nueva tarea
            const todo = new Todo( action.texto );
            //    retornamos un nuevo arreglo
            //    utilizamos el operador de propagacion
            return [ ...state, todo ];
        case fromTodo.TOGGLE_TODO:
            /*
                El metodo map() crea un nuevo array con los resultados de la llamada
                a la función indicada aplicados a cada uno de sus elementos.
             */
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    //    al utilizar el operador spread(...) nos clona todas las propiedades aqui
                    //    y las que explicitamente escribamos son las que cambiara.
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });
        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    //    modificamos el texto y retornamos un nuevo estado
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.BORRAR_TODO:
                // El m?todo filter() crea un nuevo array con todos los elementos que cumplan la condici?n implementada por la funci?n dada.
            return state.filter( todoEdit => todoEdit.id !== action.id );

        case fromTodo.BORRAR_ALL_TODO:
            return state.filter( todoDelete => !todoDelete.completado );

        default:
            return state;
    }

}
