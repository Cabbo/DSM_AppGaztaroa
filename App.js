import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import * as Firebase from 'firebase';
import apiKeys from './config/keys';
import {Login} from './componentes/LoginComponent';


export default function App() {

  if (!Firebase.apps.length) {
    console.log('Connected with Firebase')
    Firebase.initializeApp(apiKeys.firebaseConfig);
  }

  // Firebase.auth().onAuthStateChanged(user => {
  //   Login.setState({ auth: user ? true : false });
  //   if (user) {
  //     props.navigation.navigate('CampoBase');
  //   } else {
  //     props.navigation.navigate('Login');
  //   }
  // });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <Campobase />
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});