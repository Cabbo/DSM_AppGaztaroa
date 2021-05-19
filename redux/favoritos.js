import * as ActionTypes from './ActionTypes';

export const favoritos = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);

        case ActionTypes.BORRAR_FAVORITO:
            if (state.some(el => el === action.payload)) {
                //borrar
                return state.filter((fav) => fav !== action.payload);
            }
            else
                //no está
                return state;

        // case ActionTypes.FAVORITOS_LOADING:
        //     return { ...state, isLoading: true, errMess: null, favoritos: [] }

        // case ActionTypes.FAVORITOS_FAILED:
        //     return { ...state, isLoading: false, errMess: action.payload };


        default:
            return state;
    }
};
