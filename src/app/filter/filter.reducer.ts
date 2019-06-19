import * as fromFiltro from './filter.actions';

//    inicializamos el estado de los filtros de  nuestra aplicacion
const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer( state = estadoInicial, action: fromFiltro.acciones ): fromFiltro.filtrosValidos {

    switch ( action.type ) {
        case fromFiltro.SET_FILTRO:
            return action.filtro;
        default:
            return state;
    }
}

