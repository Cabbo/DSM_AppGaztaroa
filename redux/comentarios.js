import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      //add id
      //console.log("state coommenting: "+state.comentarios);
      var comm = action.payload;
      comm.id = state.comentarios.length;
      return { ...state, errMess: null, comentarios: state.comentarios.concat(comm) };

      //return state.concat(action.payload);

    default:
      return state;
  }
};