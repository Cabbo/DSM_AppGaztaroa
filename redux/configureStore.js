import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const favPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['excursiones', 'favoritos'],
}

const rootReducer = combineReducers({
    excursiones,
    comentarios,
    cabeceras,
    actividades,
    favoritos,
})

const persistedReducer = persistReducer(favPersistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, logger)
);

export const persistor = persistStore(store);