import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun';


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

      var errMsg = null
      //POST to Firebase
      fetch(baseUrl + 'comentarios/' + comm.id + '.json', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          comm
        )
      })
        .then(response => response.json())
        .catch(error => {errMsg= error.message});


      return { ...state, errMess: errMsg, comentarios: state.comentarios.concat(comm) };

    default:
      return state;
  }
};