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
                // console.log("lo borro");
                // const index = state.indexOf(action.payload);
                // var favs = state.splice(index);
                return state.filter((fav) => fav !== action.payload);
                //return favs;
            }
            else
                //no está
                console.log("no lo borro");
                return state;

        // case ActionTypes.FAVORITOS_LOADING:
        //     return { ...state, isLoading: true, errMess: null, favoritos: [] }

        // case ActionTypes.FAVORITOS_FAILED:
        //     return { ...state, isLoading: false, errMess: action.payload };


        default:
            return state;
    }
};
