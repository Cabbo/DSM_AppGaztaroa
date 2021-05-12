import * as ActionTypes from './ActionTypes';

export const comentario = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMENTARIO:
            //add id
            console.log(state);
            //action.payload.id = 10000;

            return state.concat(action.payload);
            // if (state.some(el => el === action.payload))
            //     return state;
            // else
            //     return state.concat(action.payload);
                
        default:
          return state;
      }
};
